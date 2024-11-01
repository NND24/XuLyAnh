import tensorflow as tf
from flask import Flask, request, send_file, jsonify
import cv2
import numpy as np
import logging
from io import BytesIO
from PIL import Image
from flask_cors import CORS
from tensorflow_examples.models.pix2pix import pix2pix
from effect import blur, pixelize,cartoonize1,cartoonize2,cartoonize3,comic,emboss,fattal,mirror,pastel,polygon1,polygon2,sketcher1,sketcher2,watercolor
from styleTransfer import load_checkpoint, load_and_preprocess_image, postprocess_image
from colorization import load_and_preprocess_image as load_and_preprocess_colorize, colorize_image
from colorTransfer import read_image_from_bytes, color_transfer, read_image

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Configure logging
logging.basicConfig(level=logging.INFO)

# Cartoon
@app.route('/cartoonize1', methods=['POST'])
def cartoonize1_route():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        # Convert the file to a format OpenCV can work with
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        styledImage = cartoonize1(image)

        # Convert back to a format Flask can return
        pil_image = Image.fromarray(styledImage)
        buf = BytesIO()
        pil_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@app.route('/cartoonize2', methods=['POST'])
def cartoonize2_route():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        # Convert the file to a format OpenCV can work with
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        styledImage = cartoonize2(image)

        # Convert back to a format Flask can return
        pil_image = Image.fromarray(styledImage)
        buf = BytesIO()
        pil_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@app.route('/cartoonize3', methods=['POST'])
def cartoonize3_route():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        # Convert the file to a format OpenCV can work with
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        styledImage = cartoonize3(image)

        # Convert back to a format Flask can return
        pil_image = Image.fromarray(styledImage)
        buf = BytesIO()
        pil_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

# ARTISTIC
@app.route('/comic', methods=['POST'])
def comic_route():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        # Convert the file to a format OpenCV can work with
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        styledImage = comic(image)

        # Convert back to a format Flask can return
        pil_image = Image.fromarray(styledImage)
        buf = BytesIO()
        pil_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@app.route('/emboss', methods=['POST'])
def emboss_route():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        # Convert the file to a format OpenCV can work with
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        styledImage = emboss(image)

        # Convert back to a format Flask can return
        pil_image = Image.fromarray(styledImage)
        buf = BytesIO()
        pil_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@app.route('/fattal', methods=['POST'])
def fattal_route():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        # Convert the file to a format OpenCV can work with
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        styledImage = fattal(image)

        # Convert back to a format Flask can return
        pil_image = Image.fromarray(styledImage)
        buf = BytesIO()
        pil_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@app.route('/mirror', methods=['POST'])
def mirror_route():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        # Convert the file to a format OpenCV can work with
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        styledImage = mirror(image)

        # Convert back to a format Flask can return
        pil_image = Image.fromarray(styledImage)
        buf = BytesIO()
        pil_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@app.route('/pastel', methods=['POST'])
def pastel_route():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        # Convert the file to a format OpenCV can work with
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        styledImage = pastel(image)

        # Convert back to a format Flask can return
        pil_image = Image.fromarray(styledImage)
        buf = BytesIO()
        pil_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@app.route('/polygon1', methods=['POST'])
def polygon1_route():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        # Convert the file to a format OpenCV can work with
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        styledImage = polygon1(image)

        # Convert back to a format Flask can return
        pil_image = Image.fromarray(styledImage)
        buf = BytesIO()
        pil_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@app.route('/polygon2', methods=['POST'])
def polygon2_route():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        # Convert the file to a format OpenCV can work with
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        styledImage = polygon2(image)

        # Convert back to a format Flask can return
        pil_image = Image.fromarray(styledImage)
        buf = BytesIO()
        pil_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@app.route('/sketcher1', methods=['POST'])
def sketcher1_route():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        # Convert the file to a format OpenCV can work with
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        # Apply the pencil sketch effect
        sketch = sketcher1(image)

        # Convert back to a format Flask can return
        pil_image = Image.fromarray(sketch)
        buf = BytesIO()
        pil_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500
    
@app.route('/sketcher2', methods=['POST'])
def sketcher2_route():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        # Convert the file to a format OpenCV can work with
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        styledImage = sketcher2(image)

        # Convert back to a format Flask can return
        pil_image = Image.fromarray(styledImage)
        buf = BytesIO()
        pil_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500
    
@app.route('/watercolor', methods=['POST'])
def watercolor_route():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        # Convert the file to a format OpenCV can work with
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        # Apply the pencil style effect
        styledImage = watercolor(image)

        # Convert back to a format Flask can return
        pil_image = Image.fromarray(styledImage)
        buf = BytesIO()
        pil_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500
    
# BLUR
@app.route('/blur', methods=['POST'])
def blur_route():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        # Convert the file to a format OpenCV can work with
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        # Apply the style effect
        styledImage = blur(image)

        # Convert back to a format Flask can return
        pil_image = Image.fromarray(styledImage)
        buf = BytesIO()
        pil_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500
    
@app.route('/pixelize', methods=['POST'])
def pixelize_route():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        # Convert the file to a format OpenCV can work with
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({"error": "Invalid image file"}), 400

        # Apply the style effect
        styledImage = pixelize(image)

        # Convert back to a format Flask can return
        pil_image = Image.fromarray(styledImage)
        buf = BytesIO()
        pil_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": "Internal server error"}), 500

@app.route('/styleTransfer', methods=['POST'])
def style_transfer_route():
    try:
        # Initialize model
        OUTPUT_CHANNELS = 3
        generator_g = pix2pix.unet_generator(OUTPUT_CHANNELS, norm_type='instancenorm')

        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400

        checkpoint_path = request.form.get('checkpoint_path', '../styleTransferCheckpoints/starryNightTrain')
        specific_checkpoint_path = request.form.get('specific_checkpoint_path', "../styleTransferCheckpoints/starryNightTrain/ckpt-4")

        load_checkpoint(generator_g, checkpoint_path, specific_checkpoint_path)

        # Read and preprocess image
        file = request.files['image']
        image_bytes = file.read()
        input_image, original_size = load_and_preprocess_image(image_bytes)
        input_image = tf.expand_dims(input_image, 0)

        # Generate prediction
        prediction = generator_g(input_image)
        output_image = postprocess_image(prediction, original_size)

        # Return processed image
        buf = BytesIO()
        output_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        logging.error(f"Error in style_transfer: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/colorize', methods=['POST'])
def colorize_route():
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected for uploading"}), 400

        # Load and preprocess the image
        img_array, grayscale_img = load_and_preprocess_colorize(file.read())

        # Run colorization
        colorized_img = colorize_image(img_array, grayscale_img)

        # Convert the resulting image to a format that Flask can send
        pil_image = Image.fromarray((colorized_img * 255).astype(np.uint8))  # Convert from [0, 1] to [0, 255]
        buf = BytesIO()
        pil_image.save(buf, format='PNG')
        buf.seek(0)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        logging.error(f"Error in colorize: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/colorTransfer', methods=['POST'])
def colorTransfer_route():
    try:
        # Check if both files are provided
        if 'source_image' not in request.files or 'reference_image' not in request.files:
            return jsonify({"error": "Both source and reference images are required"}), 400

        # Load images from request
        source_file = request.files['source_image']
        reference_file = request.files['reference_image']

        # Read and process the images
        source_img = read_image_from_bytes(source_file.read())
        reference_img = read_image_from_bytes(reference_file.read())

        # Apply color transfer
        colorized_img = color_transfer(source_img, reference_img)

        # Convert the LAB color back to BGR for displaying
        output_img_bgr = cv2.cvtColor(colorized_img, cv2.COLOR_LAB2BGR)

        # Save output to an in-memory file
        _, buffer = cv2.imencode('.png', output_img_bgr)
        output_image = BytesIO(buffer)

        # Send the result back as a response
        return send_file(output_image, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500
    
@app.route('/colorTransferWithSample', methods=['POST'])
def colorTransferWithSample_route():
    try:
        # Check if both files are provided
        if 'source_image' not in request.files:
            return jsonify({"error": "Both source and reference images are required"}), 400

        # Load images from request
        source_file = request.files['source_image']
        reference_file =  request.form.get('reference_image', '')

        # Read and process the images
        source_img = read_image_from_bytes(source_file.read())
        reference_img = read_image(reference_file)

        # Apply color transfer
        colorized_img = color_transfer(source_img, reference_img)

        # Convert the LAB color back to BGR for displaying
        output_img_bgr = cv2.cvtColor(colorized_img, cv2.COLOR_LAB2BGR)

        # Save output to an in-memory file
        _, buffer = cv2.imencode('.png', output_img_bgr)
        output_image = BytesIO(buffer)

        # Send the result back as a response
        return send_file(output_image, mimetype='image/png')

    except Exception as e:
        return jsonify({"error": f"Internal server error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
