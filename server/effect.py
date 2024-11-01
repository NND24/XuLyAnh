import cv2
import numpy as np
from scipy.spatial import Delaunay
import random

# BLUR
def blur(image):
    blur_value = 10
    # Chuyển đổi giá trị blur thành giá trị kernel
    kernel_size = max(1, int((blur_value / 100) * 20) + 1)  # Ensure it's odd
    if kernel_size % 2 == 0:
        kernel_size += 1

    # Áp dụng làm mờ Gaussian
    img_blur = cv2.GaussianBlur(image, (kernel_size, kernel_size), 0)
    return img_blur

def pixelize(image):
    # Điều chỉnh giá trị về khoảng 1-20
    pixelate_value = 10
    pixelate_value = max(1, min(pixelate_value, 20))

    # Calculate the scaling factor based on the pixelate value
    # Scale factor calculation: higher pixelate_value means bigger blocks
    scale_factor = pixelate_value  # Directly use pixelate_value for scaling

    # Resize to smaller dimensions
    small_image = cv2.resize(image, (image.shape[1] // scale_factor, image.shape[0] // scale_factor), interpolation=cv2.INTER_LINEAR)
    
    # Resize back to original dimensions
    pixelated_image = cv2.resize(small_image, (image.shape[1], image.shape[0]), interpolation=cv2.INTER_NEAREST)
    return pixelated_image

# ARTISTIC
def cartoonize1 (image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurImage = cv2.medianBlur(image, 1)
    edges = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 9, 9)
    color = cv2.bilateralFilter(image, 9, 200, 200)
    cartoon = cv2.bitwise_and(color, color, mask = edges)
    return cartoon

def cartoonize2(img_rgb):
    img_rgb = cv2.resize(img_rgb, (1366, 768))
    numDownSamples = 2  # số lần giảm kích thước
    numBilateralFilters = 50 # số lần lọc song phương

    # Giảm kích thước ảnh bằng Gaussian pyramid
    img_color = img_rgb
    for _ in range(numDownSamples):
        img_color = cv2.pyrDown(img_color)

    # Áp dụng bộ lọc song phương để làm mịn ảnh
    for _ in range(numBilateralFilters):
        img_color = cv2.bilateralFilter(img_color, 9, 9, 7)

    # Tạo ảnh cạnh bằng cách chuyển sang ảnh xám và làm mờ
    img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)
    img_blur = cv2.medianBlur(img_gray, 3)
    img_edge = cv2.adaptiveThreshold(img_blur, 255, cv2.ADAPTIVE_THRESH_MEAN_C, 
                                     cv2.THRESH_BINARY, 9, 2)

    # Chuyển img_edge thành RGB và thay đổi kích thước để phù hợp với img_color
    img_edge = cv2.cvtColor(img_edge, cv2.COLOR_GRAY2RGB)
    img_edge = cv2.resize(img_edge, (img_color.shape[1], img_color.shape[0]))

    # Chồng ảnh cạnh lên ảnh màu đã làm mịn
    return cv2.bitwise_and(img_color, img_edge)

def cartoonize3 (image):
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # Apply Gaussian blur
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    # Perform edge detection
    edges = cv2.Canny(blurred, threshold1=50, threshold2=150)
    # Invert the edges image
    edges_inv = cv2.bitwise_not(edges)

    def reduce_color_depth(img, levels=10):
        # Reduce the number of colors in the image
        factor = 255 // (levels - 1)
        return (img // factor) * factor

    # Reduce color depth
    reduced_color = reduce_color_depth(image)
    # Combine the edge image with the reduced color image
    cartoon = cv2.bitwise_and(reduced_color, reduced_color, mask=edges_inv)
    return cartoon

def comic (image):
    # image gray outlines
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.medianBlur(gray, 5)
    outlines = cv2.adaptiveThreshold(gray, 255,
                                    cv2.ADAPTIVE_THRESH_MEAN_C,
                                    cv2.THRESH_BINARY, 9, 9)
    # make cartoon of you image
    color = cv2.bilateralFilter(image, 9, 250, 250)
    comic  = cv2.bitwise_and(color, color, mask=outlines)
    return comic

def emboss(image):
    # Kernel mạnh hơn cho hiệu ứng emboss sắc nét
    kernel = np.array([[-2, -1, 0],
                       [-1,  1, 1],
                       [ 0,  1, 2]])
    
    # Áp dụng bộ lọc với kernel emboss
    embossed = cv2.filter2D(image, -1, kernel)

    # Thêm độ sáng cho ảnh để nổi bật chi tiết
    embossed = cv2.normalize(embossed, None, 150, 255, cv2.NORM_MINMAX)
    
    return embossed

def fattal(image):
    # Bước 1: Áp dụng CLAHE
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)  # Chuyển sang LAB để tăng sáng
    l, a, b = cv2.split(lab)

    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    l = clahe.apply(l)

    enhanced_lab = cv2.merge([l, a, b])
    enhanced_image = cv2.cvtColor(enhanced_lab, cv2.COLOR_LAB2BGR)
    # Bước 2: Tăng bão hòa và độ sáng
    hsv = cv2.cvtColor(enhanced_image, cv2.COLOR_BGR2HSV)
    h, s, v = cv2.split(hsv)
    s = cv2.add(s, 50)
    v = cv2.add(v, 30)

    enhanced_hsv = cv2.merge([h, s, v])
    fattal_effect = cv2.cvtColor(enhanced_hsv, cv2.COLOR_HSV2BGR)
    # Chuyển ảnh từ BGR sang RGB để hiển thị đúng màu với matplotlib
    step1_rgb = cv2.cvtColor(enhanced_image, cv2.COLOR_BGR2RGB)
    final_rgb = cv2.cvtColor(fattal_effect, cv2.COLOR_BGR2RGB)
    return final_rgb

def mirror(image):
    # Lấy kích thước ảnh
    height, width = image.shape[:2]

    # Tính điểm giữa (mid) và đảm bảo các phần khớp nhau
    mid = width // 2

    # Nếu chiều rộng lẻ, điều chỉnh kích thước cho nửa phải
    left_part = image[:, :mid]
    if width % 2 == 0:
        right_part = cv2.flip(left_part, 1)
    else:
        # Nếu ảnh có chiều rộng lẻ, lấy thêm 1 cột vào phần lật
        right_part = cv2.flip(image[:, :mid + 1], 1)

    # Tạo ảnh kết quả bằng cách ghép hai phần
    mirrored_image = np.hstack((left_part, right_part[:, :width - mid]))

    return mirrored_image

def pastel(image):
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    # Làm mờ ảnh bằng Gaussian Blur để tạo cảm giác mềm mại
    blurred = cv2.GaussianBlur(image_rgb, (11, 11), 0)
    # Giảm độ sâu màu bằng cách chia số lượng màu để tạo hiệu ứng pastel
    def reduce_color_depth(img, levels=25):
        # Giảm số lượng màu trong ảnh
        factor = 255 // (levels - 1)
        return (img // factor) * factor

    # Áp dụng giảm độ sâu màu
    pastel_image = reduce_color_depth(blurred)

    # Phát hiện cạnh và làm nổi bật các đường nét
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 50, 150)
    edges_colored = cv2.cvtColor(edges, cv2.COLOR_GRAY2RGB)

    # Kết hợp ảnh mờ pastel với các đường nét
    pastel_effect = cv2.addWeighted(pastel_image, 0.9, edges_colored, 0.1, 0)   
    return pastel_effect

def polygon1(img, num_points=1000, edge_points=100):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    height, width = img.shape[:2]
    
    # Generate points for triangulation
    points = []
    
    # Add points along edges
    for _ in range(edge_points):
        points.append([0, random.randint(0, height-1)])
        points.append([width-1, random.randint(0, height-1)])
        points.append([random.randint(0, width-1), 0])
        points.append([random.randint(0, width-1), height-1])
    
    # Add random points
    for _ in range(num_points):
        x = random.randint(0, width-1)
        y = random.randint(0, height-1)
        points.append([x, y])
        
    # Add corner points
    points.append([0, 0])
    points.append([width-1, 0])
    points.append([width-1, height-1])
    points.append([0, height-1])
    
    # Convert points to numpy array
    points = np.array(points)
    
    # Create triangulation
    tri = Delaunay(points)
    
    # Create output image
    output = np.zeros_like(img)
    
    # Draw triangles
    for triangle in tri.simplices:
        pts = points[triangle].astype(np.int32)
        
        # Calculate center point of triangle
        center = pts.mean(axis=0).astype(np.int32)
        
        # Get color at center point
        color = img[center[1], center[0]].tolist()
        
        # Draw filled triangle
        cv2.fillPoly(output, [pts], color)
    
    return output

def polygon2(img, num_points=1000):
    height, width = img.shape[:2]
    
    # Create points
    points = []
    
    # Add corner points
    points.append([0, 0])
    points.append([width-1, 0])
    points.append([width-1, height-1])
    points.append([0, height-1])
    
    # Add edge points
    num_edge_points = num_points // 4
    for _ in range(num_edge_points):
        points.append([0, random.randint(0, height-1)])
        points.append([width-1, random.randint(0, height-1)])
        points.append([random.randint(0, width-1), 0])
        points.append([random.randint(0, width-1), height-1])
    
    # Add random points based on edges in the image
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 100, 200)
    
    for _ in range(num_points):
        y, x = np.where(edges > 0)
        if len(x) > 0:
            idx = random.randint(0, len(x) - 1)
            points.append([x[idx], y[idx]])
        else:
            points.append([random.randint(0, width-1), random.randint(0, height-1)])
    
    # Convert points to numpy array
    points = np.array(points)
    
    # Create subdivisions
    rect = (0, 0, width, height)
    subdiv = cv2.Subdiv2D(rect)
    
    for point in points:
        try:
            subdiv.insert((int(point[0]), int(point[1])))
        except:
            continue
    
    # Get triangles
    triangles = subdiv.getTriangleList()
    
    # Create output image
    output = np.zeros_like(img)
    
    # Draw triangles
    for t in triangles:
        pt1 = (int(t[0]), int(t[1]))
        pt2 = (int(t[2]), int(t[3]))
        pt3 = (int(t[4]), int(t[5]))
        
        # Calculate center point
        center_x = int((t[0] + t[2] + t[4]) // 3)
        center_y = int((t[1] + t[3] + t[5]) // 3)
        
        # Make sure point is within image bounds
        if (0 <= center_x < width and 0 <= center_y < height):
            # Get color at center point
            color = img[center_y, center_x].tolist()
            
            # Draw filled triangle
            triangle = np.array([pt1, pt2, pt3], dtype=np.int32)
            cv2.fillPoly(output, [triangle], color)
    
    # Add slight blur to smooth edges
    output = cv2.GaussianBlur(output, (3, 3), 0)
    
    return output

def sketcher1(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (21, 21), sigmaX=0, sigmaY=0)
    sketch = cv2.divide(gray, blurred, scale=256.0)
    return sketch

def sketcher2(image):
    #PENCIL SKETCH EFFECT
    def dodgeV2(image,mask):
        return cv2.divide(image,255-mask,scale=256)
    
    kernel_sharpening = np.array([[-1,-1,-1], 
                              [-1, 9,-1],
                              [-1,-1,-1]])
    sharpened = cv2.filter2D(image,-1,kernel_sharpening)
    gray = cv2.cvtColor(sharpened , cv2.COLOR_BGR2GRAY)
    inv = 255-gray
    gaussgray = cv2.GaussianBlur(inv,ksize=(15,15),sigmaX=0,sigmaY=0)

    pencil_img = dodgeV2(gray,gaussgray)
    return pencil_img

def watercolor(image):
    scale = float(3000)/(image.shape[0] + image.shape[1])
    image = cv2.resize(image, (int(image.shape[1]*scale), int(image.shape[0]*scale)))

    img_hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    adjust_v = (img_hsv[:,:,2].astype("uint")+5)*3
    adjust_v = ((adjust_v>255)*255 + (adjust_v<255)*adjust_v).astype("uint8")
    img_hsv[:,:,2] = adjust_v
    img_soft = cv2.cvtColor(img_hsv, cv2.COLOR_HSV2BGR)
    img_soft = cv2.GaussianBlur(img_soft, (51, 51), 0)

    img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    img_gray = cv2.equalizeHist(img_gray)
    invert = cv2.bitwise_not(img_gray)
    blur = cv2.GaussianBlur(invert, (21, 21), 0)
    invertedblur = cv2.bitwise_not(blur)
    sketch = cv2.divide(img_gray, invertedblur, scale=265.0)
    sketch = cv2.merge([sketch, sketch, sketch])

    img_water = ((sketch/255.0)*img_soft).astype("uint8")

    return img_water