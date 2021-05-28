# Importing some necessary libraries
import cv2, datetime, os

from PIL import Image


def get_frame(path, title):

    """
    Take a frame from a video and return it as a PIL image.
    """
    
    # Read the video from specified path
    cam = cv2.VideoCapture(path)

    # Reading from frame
    ret, frame = cam.read()
    
    # The numpy arrays is transformed in a PIL image
    img = Image.fromarray(frame)

    # Resize image all of them have equal dimensions 
    img = img.resize((320, 240))

    # Release all space and windows once done
    cam.release()
    cv2.destroyAllWindows()

    return img


def get_duration(path):

    """
    Measure the duration of a video and return this value.
    """    

    # Read the video from specified path
    cam = cv2.VideoCapture(path)

    # Count the number of frames and the fps
    frames = cam.get(cv2.CAP_PROP_FRAME_COUNT)
    fps = int(cam.get(cv2.CAP_PROP_FPS))

    # Calculate duration of the video
    seconds = int(frames/fps)
    videoTime = datetime.timedelta(seconds=seconds)

    return videoTime
    
