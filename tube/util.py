# Importing some necessary libraries
import cv2, datetime, os


def get_frame(path, title):

    """
    Take a frame from a video and save as an image in media/images.
    """
    
    # Read the video from specified path
    cam = cv2.VideoCapture(path)

    # Reading from frame
    ret, frame = cam.read()

    print(type(frame))

    """if ret:

        # Writing the extracted image
        cv2.imwrite('media/images/' + title + '.jpg', frame)

    # Release all space and windows once done
    cam.release()
    cv2.destroyAllWindows()"""

    return frame


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
    