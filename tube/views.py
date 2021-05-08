import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required

from .models import User, Video


def index(request):
    return render(request, "tube/index.html")


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

    print(request.FILES)

    file = request.FILES['file']

    with open('tube/videos/%s' % file.name, 'wb+') as dest:
        for chunk in file.chunks():
            dest.write(chunk)

    return JsonResponse({"message": "Video sent successfully."}, status=201)     


def videos(request):

    # Get all videos
    videos = Video.objects.all()

    #print(videos)
    #print(videos.first().upload.url)
    #print(videos.first().thumbnail.url)

    # Put videos in reverse chronologial order
    videos = videos.order_by("-timestamp").all()

    return JsonResponse({"videos": [video.serialize() for video in videos]}, safe=False)


def watch(request, video_id):

    # Get the video with id video_id
    video = Video.objects.get(id=video_id)
    return render(request, "tube/watch.html", {
        "video": video,
        "rated": video.togglers.filter(id=request.user.id).exists() # Just for disable like and unlike buttons in case user already rate this video
    })
    

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