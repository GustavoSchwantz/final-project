# final-project

## Distinctiveness and Complexity

I believe my project satisfies the distinctiveness and complexity requirements since it handles video files, which is something that we did not work on in the previous projects. 

## What is contained in each file

In the project’s main directory, there is a single app called `tube`, a media directory and the `db.sqlite3` file. Inside the app called tube it is: a urls.py file, where the URL configuration for this app is defined;  a views.py file, where the different views of the tube app are defined, together with a ModelForm class for the details form; a util.py file, where a function to get an image from a video and a function to get the video’s duration are defined; a models.py file, where a model to represent an user and another model to represent a video are defined; a templates/tube/layout.html file, that contains the general structure of a page, like some imports; a templates/tube/index.html file, that contains the main page of the application; a templates/tube/watch.html file, that contains the page where videos are showed; a static/tube/styles.css file, where some CSS for watch.html is defined; a static/tube/video.js file, where the Javascript for index.html is defined; a static/tube/video2.js file, where the Javascript for watch.html is defined; 
Inside the media directory, there are two folders: images and videos. The videos from the application are stored inside the videos folder while their thumbnails are stored inside the images folder.  