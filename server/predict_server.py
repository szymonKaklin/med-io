import json

from flask import Flask, request
from flask_cors import CORS

from predict import get_prediction
from predict_3d import get_3d_prediction

app = Flask(__name__)
CORS(app)  # Set the cross origin header so that api can be called from the browser


# This method can be accessed with a post request at the address /predict
@app.route('/predict', methods=['POST'])
def predict():
    number_of_images = len(request.files.getlist('file'))

    if number_of_images == 9:
        image_array = []

        for image in request.files.getlist('file'):
            image_array.append(image.read())

        label, confidence = get_3d_prediction(image_array[0], image_array[1], image_array[2],
                                              image_array[3], image_array[4], image_array[5], image_array[6], image_array[7],
                                              image_array[8])

        response = {  # Create a dictionary with the prediction
            "label": label,
            "confidence": float(confidence)
        }

        print(response['label'])
        print(response['confidence'])

        return json.dumps(response)
    else:
        file = request.files['file']  # Get the image from the post
        img_bytes = file.read()  # Read the dat afrom the image
        # Use the model to make a prediction
        label, confidence = get_prediction(image_bytes=img_bytes)
        response = {  # Create a dictionary with the prediction
            "label": label,
            "confidence": confidence
        }
        print(response['label'])
        print(response['confidence'])
        # Convert the prediction dictionary to JSON and return it as a string
        return json.dumps(response)


if __name__ == '__main__':
    # When run localy (python predict_server.py) this will run on port 9999 - accessible http://localhost:9999
    app.run(host='0.0.0.0', port=9999, debug=True)
