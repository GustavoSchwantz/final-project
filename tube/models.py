from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Video(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=5000, blank=True)
    video = models.FileField(upload_to='videos/')
    image = models.ImageField(upload_to='images/')
    CATEGORY_CHOICES = [
        ('ED', 'Education'),
        ('MU', 'Music'),
        ('NW', 'News'),
        ('OT', 'Other')
    ]
    category = models.CharField(
        max_length=2,
        choices=CATEGORY_CHOICES,
        default='OT',
    )
    VISIBILITY_CHOICES = [
        ('PU', 'Public'),
        ('PR', 'Private'),
    ]
    visibility = models.CharField(
        max_length=2,
        choices=VISIBILITY_CHOICES,
        default='PR',
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="videos")
    views = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    unlikes = models.IntegerField(default=0)
    togglers = models.ManyToManyField(User, blank=True, related_name="toggled")

    def __str__(self):
        return f"{self.id}: {self.title}"

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "video": self.video.url,
            "image": self.image.url,
            "category": self.category,
            "visibility": self.visibility,
            "username": self.user.username,
            "views": self.views,
            "timestamp": self.timestamp.strftime("%b %-d %Y, %-I:%M %p"),
            "likes": self.likes,
            "unlikes": self.unlikes
        }

class Comment(models.Model):        
    content = models.TextField()
    video = models.ForeignKey(Video, null=True, on_delete=models.CASCADE, related_name="comments")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "username": self.user.username,
            "timestamp": self.timestamp.strftime("%b %-d %Y, %-I:%M %p")
        }