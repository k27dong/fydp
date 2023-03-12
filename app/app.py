from flask import Flask, request, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from detector import (
    process_image,
    process_video,
    process_livestream,
    capture_begin,
    process_base64_image,
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


@socketio.on("start_stream")
def start_stream():
    cap = capture_begin()

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        processed_frame = process_livestream(frame)
        emotion_scores = process_base64_image(frame)

        # Emit the processed data to the client over the WebSocket connection
        emit("processed_data", [float(x) for x in emotion_scores])
        emit("processed_frame", processed_frame)

    cap.release()


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", debug=True)
