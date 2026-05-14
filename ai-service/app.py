# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from nlp_models import english_model, urdu_model

app = Flask(__name__)
CORS(app)  # allow requests from your frontend

@app.route("/correct-sentence", methods=["POST"])
def correct_sentence():
    """
    Expected JSON:
    {
        "words": ["hello", "world"],
        "language": "english"  # or "urdu"
    }
    Response:
    {
        "corrected": "Hello world."
    }
    """
    data = request.get_json()
    words = data.get("words", [])
    language = data.get("language", "english").lower()

    if not isinstance(words, list):
        return jsonify({"error": "words must be a list"}), 400

    # Join words into a raw sentence
    raw_sentence = " ".join(words)

    # Call the correct model
    if language == "english":
        corrected = english_model(raw_sentence)
    elif language == "urdu":
        corrected = urdu_model(raw_sentence)
    else:
        corrected = raw_sentence  # fallback

    return jsonify({"corrected": corrected})


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
