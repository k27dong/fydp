import cv2
import torch
from torch.utils.mobile_optimizer import optimize_for_mobile
from torchvision import transforms
from PIL import Image
import numpy as np

IMG_SIZE = 260
MODEL_PATH = "app/models/affectnet_emotions/enet_b2_8.pt"
CASCADE_PATH = "app/haar_cascade_face_detection.xml"

transform = transforms.Compose(
    [
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ]
)

face_cascade = cv2.CascadeClassifier(CASCADE_PATH)

model = torch.load(
    MODEL_PATH,
    map_location=torch.device("cpu"),
).eval()

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


class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)

    def __del__(self):
        self.video.release()

    def get_frame(self):
        _, frame = self.video.read()

        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray_frame, 1.1, 6)

        for x, y, w, h in faces:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 250), 2)
            face_img = frame[y : y + h, x : x + w]
            img_tensor = transform(Image.fromarray(face_img))
            img_tensor.unsqueeze_(0)
            scores = model(img_tensor)
            scores = scores[0].data.numpy()
            cv2.putText(
                frame,
                idx_to_class[np.argmax(scores)],
                (x + 10, y + 15),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.5,
                (255, 255, 255),
                2,
                cv2.LINE_AA,
            )

        _, jpeg = cv2.imencode(".jpg", frame)
        return jpeg.tobytes()


def process_image(raw_img):
    image = cv2.imdecode(np.fromstring(raw_img, np.uint8), cv2.IMREAD_COLOR)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 6)

    # Creating Rectangle around face
    for x, y, w, h in faces:
        face_img = image[y : y + h, x : x + w]
        img_tensor = transform(Image.fromarray(face_img))
        img_tensor.unsqueeze_(0)
        scores = model(img_tensor)
        scores = scores[0].data.numpy()

    # softmax
    scores = np.exp(scores) / np.sum(np.exp(scores), axis=0)

    return scores
