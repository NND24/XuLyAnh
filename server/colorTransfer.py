import cv2
import numpy as np
from io import BytesIO

def read_image(input_path):
    s= cv2.imread(input_path)
    # Chuyển đổi sang không gian màu LAB
    s = cv2.cvtColor(s,cv2.COLOR_BGR2LAB)
    return s

# Function to read and preprocess the image
def read_image_from_bytes(image_bytes):
    np_img = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
    img_lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    return img_lab

# Function to get mean and standard deviation of each color channel
def get_mean_and_std(x):
    x_mean, x_std = cv2.meanStdDev(x)
    x_mean = np.hstack(np.around(x_mean, 2))
    x_std = np.hstack(np.around(x_std, 2))
    return x_mean, x_std

# Color transfer function
def color_transfer(source, reference):
    i_mean, i_std = get_mean_and_std(source)
    r_mean, r_std = get_mean_and_std(reference)

    height, width, channels = source.shape
    temp_img = source.copy()

    for i in range(height):
        for j in range(width):
            for k in range(channels):
                x = temp_img[i, j, k]
                x = ((x - i_mean[k]) * (r_std[k] / i_std[k])) + r_mean[k]
                x = round(x)
                x = max(0, min(255, x))  # Clamping to [0, 255]
                temp_img[i, j, k] = x
    return temp_img