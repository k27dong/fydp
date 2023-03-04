# FYDP

Facial recognition and emotion detection application, powered by [Torch](https://pytorch.org/), [OpenCV](https://opencv.org/), [Flask](https://flask.palletsprojects.com/en/2.2.x/), and [React](https://reactjs.org/). This project was created for the UWaterloo Faculty of Engineering's 2023 Final Year Design Project.

## Start Locally

### Mac / Linux
```bash
# Backend
virtualenv --python=python3.9 venv
source venv/bin/activate
pip install -r requirements.txt
python app/app.py

# Frontend
npm i
npm run start
```

### Windows
```bash
# Backend
python3.9 -m venv venv
./venv/Scripts/activate
pip install -r requirements.txt
python app/app.py

# Frontend
npm i
npm run start
```