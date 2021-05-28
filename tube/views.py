import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError, models
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.core.files.base import ContentFile
from django.core.files import File
from django.core.files.uploadedfile import InMemoryUploadedFile
from django import forms
from io import BytesIO

from .models import Comment, User, Video
from . import util


class DetailsForm(forms.ModelForm):
    class Meta:
        model = Video
        fields = ['title', 'description', 'image', 
                'category', 'visibility'] 

    def __init__(self, *args, **kwargs):
        super(DetailsForm, self).__init__(*args, **kwargs)
        self.fields['title'].widget.attrs.update({'class': 'form-control'})      
        self.fields['description'].widget.attrs.update({'class': 'form-control', 
        'placeholder': 'Tell about your video to the audience'})
        self.fields['image'].widget.attrs.update({'class': 'form-control'})
        self.fields['category'].widget.attrs.update({'class': 'form-select'})
        self.fields['visibility'].widget.attrs.update({'class': 'form-select'})          


@csrf_exempt
def index(request):
    return render(request, "tube/index.html", { 
        "detailsForm": DetailsForm()
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "tube/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "tube/login.html")    


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "tube/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "tube/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "tube/register.html")


@csrf_exempt
def upload(request):

    file = request.FILES['file']
    
    # Take a frame from the uploaded video to be used as a default image
    img = util.get_frame(file.temporary_file_path(), file.name)
    
    # Extract the duration from uploaded video
    duration = util.get_duration(file.temporary_file_path())

    blob = BytesIO()
    img.save(blob, 'PNG')

    video = Video(
        title=file.name, # Just because this is obligatory field. It will be changed by user later anyway
        video=file,
        duration=duration,
        user=request.user
    )
    video.image.save(file.name + '.png', File(blob))
    video.save()
    
    # Associate the uploaded video with current user, so when details form is submited, the respective video is known
    request.user.draugth.add(video)

    return JsonResponse({"message": "Video sent and save successfully."}, status=201)     


@csrf_exempt
def send(request):

    # Check if method is POST
    if request.method == "POST":
        
        # Get the video related to the form
        draugth = request.user.draugth.first()
        
        # Get the form information and update the model
        df = DetailsForm(request.POST, request.FILES, instance=draugth)
        df.save()
        
        # Once the information is saved, the video does not need be associate with current user 
        request.user.draugth.remove(draugth)

    # Redirect user to home page
    return HttpResponseRedirect(reverse("index"))    


def videos(request):

    # Get all videos
    videos = Video.objects.all()

    # Put videos in reverse chronologial order
    videos = videos.order_by("-timestamp").all()

    return JsonResponse({"videos": [video.serialize() for video in videos]}, safe=False)


def watch(request, video_id):

    # Get the video with id video_id
    video = Video.objects.get(id=video_id)
    video.views = video.views + 1
    video.save()
    return render(request, "tube/watch.html", {
        "video": video,
        "rated": video.togglers.filter(id=request.user.id).exists() # Just for disable like and unlike buttons in case user already rate this video
    })
    

@csrf_exempt
@login_required
def comment(request, video_id):

    # Writing a new comment must be via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    # Get content of comment
    data = json.loads(request.body)
    content = data.get("comment", "")
    
    # Get the video that the comment is made
    video = Video.objects.get(id=video_id)

    # Create a comment
    comment = Comment(
        content=content,
        video=video,
        user=request.user
    )
    comment.save()

    return JsonResponse({"message": "Comment sent successfully."}, status=201)

def comments(request, video_id):

    video = Video.objects.get(id=video_id)

    # Get all comments from a video
    comments = video.comments.all()

    # Put comments in reverse chronologial order
    comments = comments.order_by("-timestamp").all()    

    return JsonResponse([comment.serialize() for comment in comments], safe=False)


@csrf_exempt
@login_required
def toggle(request, video_id):
    
    # Just expect PUT requests
    if request.method == "PUT":

        # Query for requested video
        try:
            video = Video.objects.get(pk=video_id)
        except Video.DoesNotExist:
            return JsonResponse({"error": "Video not found."}, status=404)
        
        # The user can not rate the same video more than once
        if video.togglers.filter(id=request.user.id).exists():
            return JsonResponse({"error": "User already rate this video."}, status=201)
        # Rate and add that user to the video togglers's list    
        else:
            data = json.loads(request.body)
            if data.get("like"):
                video.likes = video.likes + 1 
            else:
                video.unlikes = video.unlikes + 1
            video.togglers.add(request.user)    
            video.save()
            return JsonResponse({
                "likes": video.likes, # Return number of likes and unlikes so it is not need refresh the page
                "unlikes": video.unlikes,
                "message": "Video rated successfully."}, status=201)
    
    # Toggle must be via PUT
    else:
        return JsonResponse({
            "error": "PUT request required."
        }, status=400)


@csrf_exempt
def search(request):

    print(request)

    return JsonResponse({"message": "Search query sent successfully."}, status=201)

