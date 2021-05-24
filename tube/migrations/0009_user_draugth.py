# Generated by Django 3.1.2 on 2021-05-24 14:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tube', '0008_video_duration'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='draugth',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='uploader', to='tube.video'),
        ),
    ]