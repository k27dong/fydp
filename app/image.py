import cv2
import torch
from torch.utils.mobile_optimizer import optimize_for_mobile
from torchvision import transforms
from PIL import Image
import numpy as np

idx_to_class = {
    0: "Anger",
    1: "Contempt",
    2: "Disgust",
    3: "Fear",
    4: "Happiness",
    5: "Neutral",
    6: "Sadness",
    7: "Surprise",
}

def array_to_dictionary(array):
    dictionary = {}
    for i in range(len(array)):
        dictionary[idx_to_class[i]] = array[i]
    return dictionary

def process_image(raw_img):
    IMG_SIZE = 260
    test_transforms = transforms.Compose(
        [
            transforms.Resize((IMG_SIZE, IMG_SIZE)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )

    npimg = np.fromstring(raw_img, np.uint8)
    image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    filename = "enet_b2_8"

    model = torch.load(
        "app/models/affectnet_emotions/" + filename + ".pt", map_location=torch.device("cpu")
    )
    model.eval()

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier("app/haar_cascade_face_detection.xml")
    faces = face_cascade.detectMultiScale(gray, 1.1, 6)

    # Creating Rectangle around face
    for (x, y, w, h) in faces:
        face_img = image[y : y + h, x : x + w]
        img_tensor = test_transforms(Image.fromarray(face_img))
        img_tensor.unsqueeze_(0)
        scores = model(img_tensor)
        scores = scores[0].data.numpy()
        print(array_to_dictionary(scores))

    return scores