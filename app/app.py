
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

app = Flask( __name__, static_folder="../build", static_url_path="", template_folder="../build")

CORS(app)

@app.route('/')
def serve():
  return send_from_directory(app.static_folder, "index.html")

@app.errorhandler(404)
def not_found(error):
  return send_from_directory(app.static_folder, "index.html")

@app.route('/health')
def health():
  return jsonify({"status": "ok"}), 200

@app.route('/ready')
def ready():
  return jsonify({"status": "ok"}), 200

@app.route('/api/image', methods=['POST'])
def image():
  return jsonify({"status": "ok"}), 200

def function_that_takes_long_arguments(long_argument_1, long_argument_2, long_argument_3):
  return long_argument_1

if __name__ == '__main__':
  app.run(host='0.0.0.0')
