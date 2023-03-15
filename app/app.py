from flask import Flask, request, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from app.detector import (
    process_image,
    process_video,
    process_livestream2,
)

app = Flask(
    __name__, static_folder="../build", static_url_path="", template_folder="../build"
)

app.config["CORS_HEADERS"] = "Content-Type"
CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(app, cors_allowed_origins="*")


@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/health")
def health():
    return "OK", 200


@app.errorhandler(404)
def not_found():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/api/image", methods=["POST"])
def image():
    raw_img = request.files["image"].read()
    emotion_scores = process_image(raw_img)
    scores = [float(x) for x in emotion_scores]

    return scores, 200


@app.route("/api/video", methods=["POST"])
def video():
    raw_video = request.files["video"]
    emotion_scores = process_video(raw_video)
    scores = [float(x) for x in emotion_scores]

    return scores, 200


@socketio.on("connect")
def test_connect():
    print("Connected!")


@socketio.on("disconnect")
def test_disconnect():
    print("Disconnected!")


@socketio.on("frame")
def livestream(frame):
    emotion_scores = process_livestream2(frame)
    scores = [float(x) for x in emotion_scores]
    emit("processed_data", scores)


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", debug=True)
