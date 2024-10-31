from PIL import Image, ImageEnhance, ImageFilter
import cv2
def apply_artistic_effect(image_path, output_path):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 100, 200)

    inverted_edges = cv2.bitwise_not(edges)
    colored_edges = cv2.cvtColor(inverted_edges, cv2.COLOR_GRAY2BGR)
    pastel_image = cv2.addWeighted(img, 0.5, colored_edges, 0.5, 0)

    pastel_image = Image.fromarray(pastel_image)
    enhancer = ImageEnhance.Color(pastel_image)
    pastel_image = enhancer.enhance(1.5)
    pastel_image.save(output_path)

apply_artistic_effect('../data/inp_images/img.jpg', '../data/out_images/pastel_result.png')
