import torch
import torch.nn as nn
import numpy as np
from datetime import datetime
from splitData import train_dataset, val_dataset, train_sampler, validation_sampler, targets_size, device, model_path
from torch.utils.data import DataLoader
import copy
import matplotlib.pyplot as plt  # للرسم

class CNN(nn.Module):
    def __init__(self, K):
        super(CNN, self).__init__()
        self.conv_layers = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(32),
            nn.Conv2d(32, 32, 3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(32),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(64),
            nn.Conv2d(64, 64, 3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(64),
            nn.MaxPool2d(2),
            nn.Conv2d(64, 128, 3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(128),
            nn.Conv2d(128, 128, 3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(128),
            nn.MaxPool2d(2),
            nn.Conv2d(128, 256, 3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(256),
            nn.Conv2d(256, 256, 3, padding=1),
            nn.ReLU(),
            nn.BatchNorm2d(256),
            nn.MaxPool2d(2),
        )
        self.dense_layers = nn.Sequential(
            nn.Dropout(0.4),
            nn.Linear(50176, 1024),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(1024, K),
        )

    def forward(self, X):
        out = self.conv_layers(X)
        out = out.view(-1, 50176)
        out = self.dense_layers(out)
        return out

def batch_gd(model, criterion, optimizer, train_loader, validation_loader, epochs=1, patience=3):
    train_losses = np.zeros(epochs)
    validation_losses = np.zeros(epochs)
    
    best_loss = float('inf')
    best_model_wts = copy.deepcopy(model.state_dict())
    wait = 0
    
    for e in range(epochs):
        t0 = datetime.now()
        train_loss = []
        model.train()
        # 'i' هو عداد الدفعات (Batches)
        for i, (inputs, targets) in enumerate(train_loader):
            # الكود الجديد هنا: طباعة مؤشر التقدم كل 50 دفعة
            if (i + 1) % 50 == 0:
                print(f"   [Epoch {e+1}] Processing Batch {i+1}/{len(train_loader)}...")
            
            inputs, targets = inputs.to(device), targets.to(device)
            # ... باقي الكود كما هو    
            optimizer.zero_grad()
            output = model(inputs)
            loss = criterion(output, targets)
            train_loss.append(loss.item())
            loss.backward()
            optimizer.step()
        train_loss = np.mean(train_loss)
        
        validation_loss = []
        model.eval()
        with torch.no_grad():
            for inputs, targets in validation_loader:
                inputs, targets = inputs.to(device), targets.to(device)
                output = model(inputs)
                loss = criterion(output, targets)
                validation_loss.append(loss.item())
        validation_loss = np.mean(validation_loss)
        
        train_losses[e] = train_loss
        validation_losses[e] = validation_loss
        dt = datetime.now() - t0
        print(f"Epoch : {e+1}/{epochs} Train_loss:{train_loss:.3f} Test_loss:{validation_loss:.3f} Duration:{dt}")
        
        # Early Stopping
        if validation_loss < best_loss:
            best_loss = validation_loss
            best_model_wts = copy.deepcopy(model.state_dict())
            wait = 0
        else:
            wait += 1
            if wait >= patience:
                print(f"Early stopping at epoch {e+1}")
                break
    
    # تحميل أفضل أوزان وحفظ الموديل
    model.load_state_dict(best_model_wts)
    torch.save(model.state_dict(), model_path)
    print(f"Best model saved successfully with validation loss: {best_loss:.4f}")
    
    # رسم منحنى Train vs Validation
    plt.figure(figsize=(8,5))
    plt.plot(range(1, len(train_losses[:e+1])+1), train_losses[:e+1], label="Train Loss")
    plt.plot(range(1, len(validation_losses[:e+1])+1), validation_losses[:e+1], label="Validation Loss")
    plt.xlabel("Epochs")
    plt.ylabel("Loss")
    plt.title("Train vs Validation Loss")
    plt.legend()
    plt.show()
    
    return train_losses[:e+1], validation_losses[:e+1]

if __name__ == "__main__":
    train_loader = DataLoader(train_dataset, batch_size=64, sampler=train_sampler)
    val_loader = DataLoader(val_dataset, batch_size=64, sampler=validation_sampler)
    model = CNN(targets_size).to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters())
    train_losses, validation_losses = batch_gd(model, criterion, optimizer, train_loader, val_loader, epochs=1, patience=3)