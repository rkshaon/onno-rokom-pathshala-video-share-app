from django.urls import path

from video_api import views

urlpatterns = [
    path('upload', views.upload_video_api),
    path('uploaded-list', views.get_uploaded_videoes),
]