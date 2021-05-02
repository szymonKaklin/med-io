import io
import numpy as np
import cv2
from scipy import ndimage
from tensorflow import keras
from PIL import Image

# This array contains all of the identifiers (class names) for the medicines the model is trained on.
# These must be updated if new classes are added to the model.
# These can be exported from the model like this:
# json.dumps(class_names)

# 2021
class_names = ["allo", "amio", "clari",
               "furo", "irbe", "levo", "simva", "trama"]

# Load model
path_model = "./3d_model.h5"
model = keras.models.load_model(path_model, compile=True)

# Image pre-processing : normalization


def normalize(volume):
    """Normalize the volume"""
    min = np.min(volume)
    max = np.max(volume)
    volume = (volume - min) / (max - min)
    volume = volume.astype("float32")
    return volume


# Create multispectral image : expected shape = (height, width, depth)

def form_multispectral_image(img1, img2, img3, img4, img5, img6, img7, img8, img9):
    multi_img = np.array(img1)
    multi_img = np.concatenate((multi_img, np.array(img2)), axis=-1)
    multi_img = np.concatenate((multi_img, np.array(img3)), axis=-1)
    multi_img = np.concatenate((multi_img, np.array(img4)), axis=-1)
    multi_img = np.concatenate((multi_img, np.array(img5)), axis=-1)
    multi_img = np.concatenate((multi_img, np.array(img6)), axis=-1)
    multi_img = np.concatenate((multi_img, np.array(img7)), axis=-1)
    multi_img = np.concatenate((multi_img, np.array(img8)), axis=-1)
    multi_img = np.concatenate((multi_img, np.array(img9)), axis=-1)
    multi_img = normalize(multi_img)
    multi_img = np.expand_dims(multi_img, axis=0)

    return multi_img


def get_3d_prediction(img1, img2, img3, img4, img5, img6, img7, img8, img9):
    """Crop and normalise the image (the model works with images of a fixed size).
    Parameters:
    image_bytes: The image
    Returns:
    A tuple of the predicted class_name of the image and the confidence that the prediction is correct (logmax)
    """
    image1 = cv2.imdecode(np.frombuffer(img1, np.uint8), -1)
    image2 = cv2.imdecode(np.frombuffer(img2, np.uint8), -1)
    image3 = cv2.imdecode(np.frombuffer(img3, np.uint8), -1)
    image4 = cv2.imdecode(np.frombuffer(img4, np.uint8), -1)
    image5 = cv2.imdecode(np.frombuffer(img5, np.uint8), -1)
    image6 = cv2.imdecode(np.frombuffer(img6, np.uint8), -1)
    image7 = cv2.imdecode(np.frombuffer(img7, np.uint8), -1)
    image8 = cv2.imdecode(np.frombuffer(img8, np.uint8), -1)
    image9 = cv2.imdecode(np.frombuffer(img9, np.uint8), -1)

    im_pil = Image.fromarray(image1)
    im_pil = im_pil.resize((270, 180))
    image1 = np.asarray(im_pil)

    # img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2RGB)
    im_pil = Image.fromarray(image2)
    im_pil = im_pil.resize((270, 180))
    image2 = np.asarray(im_pil)

    # img3 = cv2.cvtColor(img3, cv2.COLOR_BGR2RGB)
    im_pil = Image.fromarray(image3)
    im_pil = im_pil.resize((270, 180))
    image3 = np.asarray(im_pil)

    # img4 = cv2.cvtColor(img4, cv2.COLOR_BGR2RGB)
    im_pil = Image.fromarray(image4)
    im_pil = im_pil.resize((270, 180))
    image4 = np.asarray(im_pil)

    # img5 = cv2.cvtColor(img5, cv2.COLOR_BGR2RGB)
    im_pil = Image.fromarray(image5)
    im_pil = im_pil.resize((270, 180))
    image5 = np.asarray(im_pil)

    # img6 = cv2.cvtColor(img6, cv2.COLOR_BGR2RGB)
    im_pil = Image.fromarray(image6)
    im_pil = im_pil.resize((270, 180))
    image6 = np.asarray(im_pil)

    # img7 = cv2.cvtColor(img7, cv2.COLOR_BGR2RGB)
    im_pil = Image.fromarray(image7)
    im_pil = im_pil.resize((270, 180))
    image7 = np.asarray(im_pil)

    # img8 = cv2.cvtColor(img8, cv2.COLOR_BGR2RGB)
    im_pil = Image.fromarray(image8)
    im_pil = im_pil.resize((270, 180))
    image8 = np.asarray(im_pil)

    # img9 = cv2.cvtColor(img9, cv2.COLOR_BGR2RGB)
    im_pil = Image.fromarray(image9)
    im_pil = im_pil.resize((270, 180))
    image9 = np.asarray(im_pil)

    myInput = form_multispectral_image(
        image1, image2, image3, image4, image5, image6, image7, image8, image9)
    predictions = model.predict(myInput)[0]
    confidence = np.max(predictions)
    label_num = np.argmax(predictions)
    label = class_names[label_num]
    return (label, confidence)
