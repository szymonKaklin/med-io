import json

from flask import Flask, request
from flask_cors import CORS

from predict import get_prediction

app = Flask(__name__)
CORS(app) ## Set the cross origin header so that api can be called from the browser

@app.route('/predict', methods=['POST']) ## This method can be accessed with a post request at the address /predict
def predict():
    number_of_images = len(request.files.getlist('file'))
    
    if number_of_images == 9:
        # Pseudocode (TO_DO):
        # Loop through images
            # Read each image into bytes, and append to an array
        # label, confidence = get_prediction( [<array_of_images>] )

        return json.dumps({"label": "allo", "confidence": 1})
    else:
        file = request.files['file'] ## Get the image from the post
        img_bytes = file.read() ## Read the dat afrom the image
        label, confidence = get_prediction(image_bytes=img_bytes) ## Use the model to make a prediction
        response = { ## Create a dictionary with the prediction
            "label": label,
            "confidence": confidence
        }
        return json.dumps(response) ## Convert the prediction dictionary to JSON and return it as a string

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9999, debug=True) ## When run localy (python predict_server.py) this will run on port 9999 - accessible http://localhost:9999

