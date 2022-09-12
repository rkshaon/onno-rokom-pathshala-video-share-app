from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['POST'])
def user_registration_api(request):
    data = request.data
    print('front-end-request-data: ', data)
    
    return Response({
        'status': True,
        'data': data,
    })