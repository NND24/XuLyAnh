import tensorflow as tf
import os
from PIL import Image

def load_checkpoint(generator_g, checkpoint_path, specific_checkpoint_path=None):
    """Load a model checkpoint for style transfer."""
    ckpt = tf.train.Checkpoint(generator_g=generator_g)
    if specific_checkpoint_path:
        ckpt.restore(specific_checkpoint_path).expect_partial()
    else:
        ckpt_manager = tf.train.CheckpointManager(ckpt, checkpoint_path, max_to_keep=5)
        ckpt.restore(ckpt_manager.latest_checkpoint).expect_partial()

def load_and_preprocess_image(image_bytes):
    """Load and preprocess image bytes for model inference."""
    image = tf.image.decode_image(image_bytes, channels=3)
    original_size = tf.shape(image)[:2]
    if original_size[0] != 256 or original_size[1] != 256:
        image = tf.image.resize(image, [256, 256])
    image = (image / 127.5) - 1  # Normalize to [-1, 1]
    return image, original_size

def postprocess_image(image, original_size):
    """Postprocess model output to convert it back to an image."""
    image = (image[0] + 1) * 127.5
    image = tf.image.resize(image, original_size)
    image = tf.cast(image, tf.uint8).numpy()
    return Image.fromarray(image)
