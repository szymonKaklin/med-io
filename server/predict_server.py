import json

from flask import Flask, request
from flask_cors import CORS

from predict import get_prediction

app = Flask(__name__)
CORS(app)  # Set the cross origin header so that api can be called from the browser


# This method can be accessed with a post request at the address /predict
@app.route('/predict', methods=['POST'])
def predict():
    number_of_images = len(request.files.getlist('file'))

    if number_of_images == 9:
        # Pseudocode (TO_DO):
        # Loop through images
        # Read each image into bytes, and append to an array
        # label, confidence = get_prediction( [<array_of_images>] )

        return json.dumps({"label": "allo", "confidence": 1})
    else:
        file = request.files['file']  # Get the image from the post
        img_bytes = file.read()  # Read the dat afrom the image
        # Use the model to make a prediction
        label, confidence = get_prediction(image_bytes=img_bytes)
        response = {  # Create a dictionary with the prediction
            "label": label,
            "confidence": confidence
        }
        # Convert the prediction dictionary to JSON and return it as a string
        return json.dumps(response)


if __name__ == '__main__':
    # When run localy (python predict_server.py) this will run on port 9999 - accessible http://localhost:9999
    app.run(host='0.0.0.0', port=9999, debug=True)
