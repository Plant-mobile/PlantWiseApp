from PIL import Image
from torchvision import transforms
import torch
from splitData import device, transform_index_to_disease
from model_loader import load_trained_model
import os

# ✅ تحميل الموديل مرة واحدة فقط
model = load_trained_model()
model.to(device)
model.eval()

# تحويلات للـ prediction (بدون augmentation إضافي)
transform_predict = transforms.Compose([
    transforms.Resize(255),
    transforms.CenterCrop(224),
    transforms.ToTensor()
])

def single_prediction(image_path):
    image = Image.open(image_path)
    input_data = transform_predict(image).unsqueeze(0).to(device)  # إضافة batch dimension

    with torch.no_grad():
        output = model(input_data)
        index = torch.argmax(output, dim=1).item()

    predicted_class = transform_index_to_disease[index]
    print("Original :", os.path.basename(image_path).split('.')[0])
    print("Predicted:", predicted_class) 