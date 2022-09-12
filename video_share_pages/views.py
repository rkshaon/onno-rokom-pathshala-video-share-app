from django.shortcuts import render

def home_page(request):
    context = {}

    return render(request, 'pages/home.html', context)

def dashboard_page(request):
    context = {}

    return render(request, 'pages/dashboard.html', context)