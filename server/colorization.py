from io import BytesIO
import numpy as np
from keras.preprocessing.image import img_to_array, load_img
from skimage.color import lab2rgb
from keras.models import load_model
from skimage.transform import resize  # Import resize for better quality

# Load the trained model once to avoid reloading for every request
model = load_model('../colorizationCheckpoints/model_epoch_06.keras')  # Adjust path as necessary

def load_and_preprocess_image(file_data):
    """Load and preprocess grayscale image for colorization."""
    # Wrap binary data in a BytesIO object
    image_file = BytesIO(file_data)

    # Load image as grayscale and resize
    img = load_img(image_file, target_size=(256, 256), color_mode="grayscale")  # Resize to 256x256
    img_array = img_to_array(img) / 255.0  # Normalize to [0, 1]
    grayscale_img = np.stack((img_array[:, :, 0],) * 3, axis=-1)  # Create RGB image from grayscale
    img_batch = np.expand_dims(grayscale_img, axis=0)  # Add batch dimension
    return img_batch, img_array

def colorize_image(img_batch, grayscale_img):
    """Colorize the grayscale image using the pre-trained model."""
    # Predict colorization
    output = model.predict(img_batch)
    output = np.reshape(output, (256, 256, 2))  # Reshape to (256, 256, 2)

    # Prepare LAB image with L channel from the grayscale image
    outputLAB = np.zeros((256, 256, 3))
    outputLAB[:, :, 0] = grayscale_img[:, :, 0] * 100  # L channel, scaled to [0, 100]
    outputLAB[:, :, 1:] = output * 255 - 128  # AB channels, scaled to [-128, 127]

    # Convert LAB image to RGB
    rgb_image = lab2rgb(outputLAB)
    rgb_image_resized = resize(rgb_image, (256, 256), anti_aliasing=True)  # Resize for better quality

    return rgb_image_resized
