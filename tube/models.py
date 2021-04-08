from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass

class Video(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=5000, blank=True)
    upload = models.FileField(upload_to='videos/')
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