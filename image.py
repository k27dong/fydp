

import cv2
import torch
from torch.utils.mobile_optimizer import optimize_for_mobile
from torchvision import transforms
from PIL import Image
import numpy as np


idx_to_class = {0: 'Anger', 1: 'Contempt', 2: 'Disgust', 3: 'Fear',
                4: 'Happiness', 5: 'Neutral', 6: 'Sadness', 7: 'Surprise'}


IMG_SIZE = 260
test_transforms = transforms.Compose(
    [
        transforms.Resize((IMG_SIZE, IMG_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ]
)
print(test_transforms)


INPUT_SIZE = 260  # 224
example = torch.rand(1, 3, INPUT_SIZE, INPUT_SIZE)
filename = 'enet_b2_8'
model = torch.load('./models/affectnet_emotions/'+filename +
                   '.pt', map_location=torch.device('cpu'))
model.eval()


# Importing HARR CASCADE XML file
face_cascade = cv2.CascadeClassifier('haar_cascade_face_detection.xml')

# Capture Video from web cam hence (0) or else add your own media file
cap = cv2.VideoCapture(0)

# Creating a loop to capture each frame of the video in the name of Img
while True:
    _, img = cap.read()

    # Converting to grey scale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Allowing multiple face detection
    faces = face_cascade.detectMultiScale(gray, 1.1, 6)

    # Creating Rectangle around face
    for(x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x+w, y+h), (0, 0, 250), 2)
        face_img = img[y:y+h, x:x+w]
        img_tensor = test_transforms(Image.fromarray(face_img))
        img_tensor.unsqueeze_(0)
        scores = model(img_tensor)
        scores = scores[0].data.numpy()
        cv2.putText(img, idx_to_class[np.argmax(scores)], (x+10, y+15),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA)

#         print(scores)

    # Displaying the image
    cv2.imshow('Detected Face Image',  img)

    # Waiting for escape key for image to close adding the break statement to end the face detection screen
    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

# Real-time releasing the captired frames
cap.release()
