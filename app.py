#creating a Flask app to run phishing email detector
from flask import Flask, request, jsonify, render_template
import numpy as np
import pickle
from flask_cors import CORS

# initializing the Flask app
app = Flask(__name__)
CORS(app)  # for frontend requests

# Load the trained vectorizer and model using pickle
with open('vector.pkl', 'rb') as vector_file:
    vectorizer = pickle.load(vector_file)

with open('model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Define the home route
@app.route('/')
def home():
    return render_template('index.html')  # Render the HTML template

# define the route for making predictions
@app.route('/predict', methods=['POST'])
def predict():
    text = request.form.get('text')  # Get text data from the form
    if text is not None:
        text_transformed = vectorizer.transform([text])  # transform the text data
        prediction = model.predict(text_transformed)[0]  # make prediction
        return jsonify({'prediction': int(prediction)})  # return the prediction
    else:
        return jsonify({'error': 'Input text not provided.'})  # return an error if no text is provided

if __name__ == '__main__':
    app.run(debug=True)  # run the Flask app
