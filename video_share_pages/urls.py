from django.urls import path

from video_share_pages import views

urlpatterns = [
    path('', views.home_page, name='home'),
    path('home', views.home_page, name='home'),
    path('dashboard', views.dashboard_page, name='dashboard'),
    path('login', views.login_page, name='login'),
    path('register', views.register_page, name='register'),
    path('upload-video', views.upload_video_page, name='upload'),
]