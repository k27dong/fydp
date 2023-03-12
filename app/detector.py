import base64
import numpy as np
import cv2
import torch
import os
from werkzeug.datastructures import FileStorage
from torch.utils.mobile_optimizer import optimize_for_mobile
from torchvision import transforms
from PIL import Image

IMG_SIZE = 260
MODEL_PATH = "app/models/affectnet_emotions/enet_b2_8.pt"
CASCADE_PATH = "app/haar_cascade_face_detection.xml"
TEMP_VIDEO_STORAGE = "tmp"
EMOTION_INDEX = {
    0: "Anger",
    1: "Contempt",
    2: "Disgust",
    3: "Fear",
    4: "Happiness",
    5: "Neutral",
    6: "Sadness",
    7: "Surprise",
}

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


def process_base64_image(image):
    gray_frame = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray_frame, 1.1, 6)
    scores = []

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


def process_image(raw_img):
    image = cv2.imdecode(np.fromstring(raw_img, np.uint8), cv2.IMREAD_COLOR)
    faces = face_cascade.detectMultiScale(
        cv2.cvtColor(image, cv2.COLOR_BGR2GRAY), 1.1, 6
    )
    scores = None

    # Creating Rectangle around face
    for x, y, w, h in faces:
        face_img = image[y : y + h, x : x + w]
        img_tensor = transform(Image.fromarray(face_img))
        img_tensor.unsqueeze_(0)
        scores = model(img_tensor)
        scores = scores[0].data.numpy()

    # softmax
    scores = (
        [0] * len(EMOTION_INDEX)
        if scores is None
        else np.exp(scores) / np.sum(np.exp(scores), axis=0)
    )

    return scores


def process_video(raw_video):
    total_scores = [0] * len(EMOTION_INDEX)

    os.makedirs(TEMP_VIDEO_STORAGE, exist_ok=True)
    file_path = os.path.join(TEMP_VIDEO_STORAGE, raw_video.filename)
    raw_video.save(file_path)
    cap = cv2.VideoCapture(file_path)

    while True:
        ret, frame = cap.read()

        if not ret:
            break

        faces = face_cascade.detectMultiScale(
            cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY), 1.1, 6
        )

        for x, y, w, h in faces:
            face_img = frame[y : y + h, x : x + w]
            img_tensor = transform(Image.fromarray(face_img))
            img_tensor.unsqueeze_(0)
            scores = model(img_tensor)
            scores = scores[0].data.numpy()

        total_scores = [scores[i] + total_scores[i] for i in range(len(scores))]

    cap.release()
    os.remove(file_path)

    # softmax
    total_scores = (
        [0] * len(EMOTION_INDEX)
        if total_scores is None
        else np.exp(total_scores) / np.sum(np.exp(total_scores), axis=0)
    )

    return total_scores


def process_livestream(frame):
    # TODO: this is commented out for performance reasons
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
            EMOTION_INDEX[np.argmax(scores)],
            (x + 10, y + 15),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (255, 255, 255),
            2,
            cv2.LINE_AA,
        )

    _, buffer = cv2.imencode(".jpg", frame)
    processed_frame_str = base64.b64encode(buffer).decode("utf-8")

    return processed_frame_str


def capture_begin():
    return cv2.VideoCapture(0)
