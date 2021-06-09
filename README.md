# TheyTube Project

## Distinctiveness and Complexity

I believe my project satisfies the distinctiveness and complexity requirements because: it is a video sharing website, which is something distinct from search, wiki, e-commerce, email and social network; in all previous projects we worked mainly with text, and images were optional. Here, images and video files were used, things that were not seen and are more complex to work with; it is possible to upload a file by choosing from the computer's file system or dragging the video to a specific area, which is something we did not learn during the course; Python is being used to manipulate images and videos; many Django features not seen during the course neither implemented in previous projects were used here like ModelForm, FileField, DurationField, ImageField and media manipulation; it was used Bootstrap elements not seen during the course like Modals, Cards, Collapse, List Group; a Django’s form was styled with Bootstrap; searches are being done not just based on some string but also based in date and time, duration of the video and number of likes.     

## What is contained in each file

In the TheyTube's project there is a single app called `tube` and a `media` directory. The `media` directory is where the videos and images used in this application are saved. In `tube/util.py` there are two functions that are used to manipulate the video files. `get_image` takes a frame from a video and returns it as a PIL image. `get_duration` measures the duration of a video and returns this value. In `tube/urls.py` is where the URL configuration for the tube app is defined. Inside `tube/models.py` is defined two Django’s models, `User` for represent users and `Video` to represent video files. `tube/templates/tube/layout.html` defines that each page should include the Bootstrap library. `tube/templates/tube/watch.html` inherits from `layout.html` file and specifies how a video should be shown to the users. `tube/templates/tube/index.html` inherits from `layout.html` also, and specifies how the main page of the site looks like, containing the navbar menu with the logo, the sidebar menu and a container where the videos are added. `tube/templates/tube/register.html` is a template that lets users register in the site. `tube/templates/tube/login.html` shows the users a form to log in the site. The `tube/static/tube/video.js` file is where the Javascript code for `index.html` is defined; here there are functions to do search, upload videos and add them to the DOM. The `tube/static/tube/video2.js` file is where the Javascript code for `watch.html` is defined; here there are the functions for implementing the like/unlike feature, add and show comments in the DOM. `tube/static/tube/styles.css` contain some CSS style for the upload video’s form and for showing the video in `watch.html`.

## How to run

Start by running `python manage.py runserver` inside the project’s main directory.

## Additional information

The "Trash" and "Library" links in the home do not go anywhere, they are there just for good appearance; the colors of the video's thumbnails are a little strange, but the colors in the videos are ok. 