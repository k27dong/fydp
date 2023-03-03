from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from image import process_image

app = Flask(
    __name__, static_folder="../build", static_url_path="", template_folder="../build"
)

CORS(app)

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


@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")


@app.errorhandler(404)
def not_found():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/health")
def health():
    return jsonify({"status": "ok"}), 200


@app.route("/ready")
def ready():
    return jsonify({"status": "ok"}), 200


@app.route("/api/image", methods=["POST"])
def image():
    raw_img = request.files["image"].read()
    emotion_scores = process_image(raw_img)
    # scores = {EMOTION_INDEX[i]: float(emotion_scores[i]) for i in range(len(emotion_scores))}
    scores = [float(x) for x in emotion_scores]

    return scores, 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
