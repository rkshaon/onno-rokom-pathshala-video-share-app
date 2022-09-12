from django.urls import path

from video_api import views

urlpatterns = [
    path('', views.get_all_videoes),
    path('details/<video_id>', views.get_video_details),
    path('upload', views.upload_video_api),
    path('uploaded-list', views.get_uploaded_videoes),
    path('increase-video-view/<video_id>', views.increase_video_view_count),
    path('like-or-dislike/<video_id>', views.like_or_dislike_video),
]