from django.shortcuts import render

def home_page(request):
    context = {}

    return render(request, 'pages/home.html', context)

def dashboard_page(request):
    context = {}

    return render(request, 'pages/dashboard.html', context)

def login_page(request):
    context = {}

    return render(request, 'pages/login.html', context)

def register_page(request):
    context = {}

    return render(request, 'pages/register.html', context)

def upload_video_page(request):
    context = {}
    
    return render(request, 'pages/upload.html', context)