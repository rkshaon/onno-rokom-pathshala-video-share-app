from django.urls import path

from video_share_pages import views

urlpatterns = [
    path('', views.home_page, name='home'),
]