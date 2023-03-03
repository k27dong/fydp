# FYDP

## Start Locally

Some setup work for the first time:

```bash
virtualenv --python=python3.9 venv
source venv/bin/activate
pip install -r requirements.txt
npm i
```

To start only the frontend:

```bash
npm run start
```

To start both frontend and backend:

```bash
npm run build
python app/app.py   # within the virtualenv
```
