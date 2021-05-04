from django.contrib import admin
from .models import Comment, User, Video

# Register your models here.
admin.site.register(Comment)
admin.site.register(User)
admin.site.register(Video)
