import cv2
import torch
from torch.utils.mobile_optimizer import optimize_for_mobile
from torchvision import transforms
from PIL import Image
import numpy as np

IMG_SIZE = 260
MODEL_PATH = "app/models/affectnet_emotions/enet_b2_8.pt"
CASCADE_PATH = "app/haar_cascade_face_detection.xml"


def process_image(raw_img):
    test_transforms = transforms.Compose(
        [
            transforms.Resize((IMG_SIZE, IMG_SIZE)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ]
    )

    image = cv2.imdecode(np.fromstring(raw_img, np.uint8), cv2.IMREAD_COLOR)

    model = torch.load(
        MODEL_PATH,
        map_location=torch.device("cpu"),
    )
    model.eval()

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(CASCADE_PATH)
    faces = face_cascade.detectMultiScale(gray, 1.1, 6)

    # Creating Rectangle around face
    for x, y, w, h in faces:
        face_img = image[y : y + h, x : x + w]
        img_tensor = test_transforms(Image.fromarray(face_img))
        img_tensor.unsqueeze_(0)
        scores = model(img_tensor)
        scores = scores[0].data.numpy()

    # softmax
    scores = np.exp(scores) / np.sum(np.exp(scores), axis=0)

    return scores
