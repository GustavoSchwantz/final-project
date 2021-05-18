from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("upload", views.upload, name="upload"),
    path("videos", views.videos, name="videos"),
    path("watch/<int:video_id>", views.watch, name="watch"),
    path("comment/<int:video_id>", views.comment, name="comment"),
    path("comments/<int:video_id>", views.comments, name="comments"),
    path("toggle/<int:video_id>", views.toggle, name="toggle"),
    path("search", views.search, name="search"),
]
