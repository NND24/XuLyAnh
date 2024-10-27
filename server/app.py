from flask import Flask, request, send_file
import cv2
import numpy as np
from io import BytesIO
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

def pencil_sketch(image):
    grey_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    invert = cv2.bitwise_not(grey_image)
    blur = cv2.GaussianBlur(invert, (21, 21), 0)
    inverted_blur = cv2.bitwise_not(blur)
    sketch = cv2.divide(grey_image, inverted_blur, scale=256.0)
    return sketch

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return {"error": "No file part in the request"}
    
    file = request.files['file']
    if file.filename == '':
        return {"error": "No file selected for uploading"}
    
    # Convert the file to a format OpenCV can work with
    file_bytes = np.frombuffer(file.read(), np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # Apply the pencil sketch effect
    sketch = pencil_sketch(image)
    
    # Convert back to a format Flask can return
    pil_image = Image.fromarray(sketch)
    buf = BytesIO()
    pil_image.save(buf, format='PNG')
    buf.seek(0)
    
    return send_file(buf, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
