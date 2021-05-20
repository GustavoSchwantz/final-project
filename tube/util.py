# Importing some necessary libraries
import cv2, os


def get_frame(path, title):

    """
    Take a frame from a video and save as an image in media/images.
    """
    
    # Read the video from specified path
    cam = cv2.VideoCapture(path)

    # Reading from frame
    ret, frame = cam.read()

    if ret:

        # Writing the extracted image
        cv2.imwrite('media/images/' + title + '.jpg', frame)

    # Release all space and windows once done
    cam.release()
    cv2.destroyAllWindows()
