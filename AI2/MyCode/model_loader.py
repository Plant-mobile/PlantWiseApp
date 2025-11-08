import torch
from trainModel import CNN
from splitData import targets_size, model_path, device

def load_trained_model():
    model = CNN(targets_size)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()
    return model
