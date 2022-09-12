from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from user_api.serializers import UserSerializer


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
    
    # user_serializer = UserSerializer(data=data)
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