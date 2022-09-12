from django.urls import path

from video_api import views

urlpatterns = [
    path('upload', views.upload_video_api),
]