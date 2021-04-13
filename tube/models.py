from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Video(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=5000, blank=True)
    upload = models.FileField(upload_to='videos/')
    thumbnail = models.ImageField(upload_to='images/')
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

    def __str__(self):
        return f"{self.id}: {self.title}"

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "upload": self.upload.url,
            "thumbnail": self.thumbnail.url,
            "category": self.category,
            "visibility": self.visibility,
            "username": self.user.username,
            "views": self.views,
            "timestamp": self.timestamp.strftime("%b %-d %Y, %-I:%M %p")
        }