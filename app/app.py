from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from detector import process_image, process_livestream, capture_begin
from flask_socketio import SocketIO, emit

app = Flask(
    __name__, static_folder="../build", static_url_path="", template_folder="../build"
)

CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")


@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")


@app.errorhandler(404)
def not_found():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/api/image", methods=["POST"])
def image():
    raw_img = request.files["image"].read()
    emotion_scores = process_image(raw_img)
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
    print("here")
    cap = capture_begin()

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        processed_frame = process_livestream(frame)
        emit("processed_frame", processed_frame)

    cap.release()


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", debug=True)
