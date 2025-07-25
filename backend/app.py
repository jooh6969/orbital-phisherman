import pickle
from backend.feature_extraction import extract_features
from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)

import backend.phish_llm

model_path = os.path.join(os.path.dirname(__file__), "phishing_model.pkl")
with open(model_path, "rb") as f:
    model = pickle.load(f)

test_url = "http://google.com"


@app.route('/predict', methods=['POST'])
def predict():
    url = request.json.get("url")
    if not url:
        return jsonify({'error': 'No URL provided'}), 400
    features = extract_features(url)
    print(features)
    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0]
    confidence = max(probability)
    return jsonify({'result': "Phishing" if int(prediction) == 1 else "Not Phishing", 'confidence' : round(confidence * 100 , 2)})


if __name__ == '__main__':
    app.run(debug=True)



