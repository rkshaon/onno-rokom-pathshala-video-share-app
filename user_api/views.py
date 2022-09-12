from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

import jwt
import datetime

from user_api.serializers import UserSerializer

from user_api.models import User


@api_view(['POST'])
def user_registration_api(request):
    data = request.data
    print('front-end-request-data: ', data)

    if 'email' not in data or data['email'] == '' or 'password' not in data or data['password'] == '':
        return Response({
            'status': False,
            'message': 'username and password are required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    user_data = {
        'username': data['username'],
        'name': data['name'],
        'email': data['email'],
        'password': data['password'],
    }
    
    user_serializer = UserSerializer(data=user_data)

    if user_serializer.is_valid():
        user_serializer.save()
    else:
        print('Errors: ', user_serializer.errors)
        return Response({
            'status': False,
            'message': str(user_serializer.errors),
        }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    return Response({
        'status': True,
        'data': data,
    })


@api_view(['POST'])
def user_login_api(request):
    data = request.data
    
    if 'credential' not in data or data['credential'] == '' or 'password' not in data or data['password'] == '':
        return Response({
            'status': False,
            'message': 'credential and password are required'
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        try:
            user = User.objects.get(username=data['credential'])
        except Exception as e:
            print(e)
            user = User.objects.get(email=data['credential'])
    except User.DoesNotExist:
        return Response({
            'status': False,
            'message': 'user does not exist'
        }, status=status.HTTP_404_NOT_FOUND)

    if not user.check_password(data['password']):
        return Response({
            'status': False,
            'message': 'incorrect password'
        }, status=status.HTTP_401_UNAUTHORIZED)

    payload = {
        'id': user.id,
        'iat': datetime.datetime.utcnow()
    }
    
    token = jwt.encode(payload, 'secret', algorithm='HS256')
    response = Response()

    response.set_cookie(key='token', value=token, httponly=True)
    response.data = {
        'status': True,
        'data': {
            'token': token,
            'email': user.email,
            'username': user.username,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'id': user.id,
        },
    }

    return response