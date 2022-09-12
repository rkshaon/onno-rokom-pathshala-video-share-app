from django.urls import path

from user_api import views

urlpatterns = [
    path('register', views.user_registration_api),
]