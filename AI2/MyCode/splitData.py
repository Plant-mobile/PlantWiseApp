import torch
from torchvision import datasets, transforms
import numpy as np
from torch.utils.data.sampler import SubsetRandomSampler
import os

# -----------------------
# المسارات
# -----------------------
dataset_path = r"C:\Users\user\Desktop\zmzm\Plant_leaf_diseases_dataset_with_augmentation"
model_path = r"C:\Users\user\Desktop\zmzm\AI2\Model\plant_disease_model.pt"
# -----------------------
# التحويلات
# -----------------------
# Transformations للـ training مع Data Augmentation
train_transform = transforms.Compose([
    transforms.Resize(255),
    transforms.CenterCrop(224),
    transforms.RandomHorizontalFlip(),
    transforms.RandomVerticalFlip(),
    transforms.RandomRotation(15),
    transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2, hue=0.1),
    transforms.ToTensor()
])

# Transformations للـ validation/testing
val_transform = transforms.Compose([
    transforms.Resize(255),
    transforms.CenterCrop(224),
    transforms.ToTensor()
])

# -----------------------
# تحميل البيانات
# -----------------------
# التدريب
train_dataset = datasets.ImageFolder(dataset_path, transform=train_transform)
# التحقق / الاختبار
val_dataset = datasets.ImageFolder(dataset_path, transform=val_transform)

# -----------------------
# تقسيم البيانات
# -----------------------
indices = list(range(len(train_dataset)))
np.random.shuffle(indices)
split = int(np.floor(0.85 * len(train_dataset)))
validation = int(np.floor(0.70 * split))

train_indices = indices[:validation]
validation_indices = indices[validation:split]
test_indices = indices[split:]

train_sampler = SubsetRandomSampler(train_indices)
validation_sampler = SubsetRandomSampler(validation_indices)
test_sampler = SubsetRandomSampler(test_indices)

# -----------------------
# إعدادات الموديل
# -----------------------
targets_size = len(train_dataset.class_to_idx)
transform_index_to_disease = {v: k for k, v in train_dataset.class_to_idx.items()}

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


if __name__ == "__main__":
    # الآن هذه الأوامر ستُنفذ فقط إذا شغلت splitData.py مباشرة
    # لن تُنفذ عند استيراده في trainModel.py

    print(device) # اطبع الجهاز هنا

    # -----------------------
    # طباعة معلومات عن تقسيم البيانات
    # -----------------------
    print(0, validation, split, len(train_dataset))
    print(f"length of train size :{validation}")
    print(f"length of validation size :{split - validation}")
    print(f"length of test size :{len(train_dataset)-validation}")

