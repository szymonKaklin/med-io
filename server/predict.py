import io

import torch
import torch.nn as nn

from torchvision import models
import torchvision.transforms as transforms
from PIL import Image

model = models.vgg16()

## This array contains all of the identifiers (class names) for the medicines the model is trained on.
## These must be updated if new classes are added to the model.
## These can be exported from the model like this:
## json.dumps(class_names)
class_names = ["allo", "azith", "crocin", "dilt", "flu", "ibu", "para", "tams"]

classifier_input = model.classifier[0].in_features
num_labels = len(class_names)

classifier = nn.Sequential(nn.Linear(classifier_input, 4096),
                           nn.ReLU(),
                           nn.Linear(4096, 1024),
                           nn.ReLU(),
                           nn.Linear(1024, 512),
                           nn.ReLU(),
                           nn.Linear(512, num_labels),
                           nn.LogSoftmax(dim=1))

model.classifier = classifier

## This step loads the model from the .pt file 
## This file is exported from the model using a command like this after model has been trained:
## torch.save(model.state_dict(), 'model.pt')
model.load_state_dict(torch.load(
    "model.pt",
    map_location=torch.device('cpu')
))
# Since we are using our model only for inference, switch to `eval` mode:
model.eval()



def transform_image(image_bytes):
    """Crop and normalise the image (the model works with images of a fixed size).

    Parameters:
    image_bytes: The image

    Returns:
    The normalised image as a tensor.

    """
    my_transforms = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
    ])
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    return my_transforms(image).unsqueeze(0)


def get_prediction(image_bytes):
    """Crop and normalise the image (the model works with images of a fixed size).

    Parameters:
    image_bytes: The image

    Returns:
    A tuple of the predicted class_name of the image and the confidence that the prediction is correct (logmax)

    """
    tensor = transform_image(image_bytes=image_bytes)
    outputs = model.forward(tensor)
    confidence, label = outputs.max(1)
    return (class_names[label.item()] , confidence.item())