from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import numpy as np
from sklearn.preprocessing import PolynomialFeatures
import joblib

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load the pre-trained model and the PolynomialFeatures transformer
model = joblib.load('model.pkl')  # Make sure the model is stored as 'model.pkl'
poly = joblib.load('poly.pkl')  # Make sure the polynomial features transformer is saved

@app.route('/predict/', methods=['POST'])
def predict():
    try:
        # Get data from POST request
        data = request.get_json()

        # Check if all required fields are in the incoming data
        required_fields = ['M/F', 'Age', 'EDUC', 'SES', 'MMSE', 'CDR', 'eTIV', 'nWBV', 'ASF']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400

        # Extract the feature values from the input
        X_input = np.array([
            [data['M/F'], data['Age'], data['EDUC'], data['SES'],
             data['MMSE'], data['CDR'], data['eTIV'], data['nWBV'], data['ASF']]
        ])

        # Apply PolynomialFeatures transformation
        X_poly = poly.transform(X_input)

        # Make prediction
        prediction = model.predict(X_poly)

        # Return prediction as JSON
        return jsonify({'prediction': prediction.tolist()})

    except Exception as e:
        return jsonify({'error': f'Error in prediction: {str(e)}'}), 400


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8000)
