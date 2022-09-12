from django.urls import path

from video_api import views

urlpatterns = [
    path('', views.get_all_videoes),
    path('upload', views.upload_video_api),
    path('uploaded-list', views.get_uploaded_videoes),
]