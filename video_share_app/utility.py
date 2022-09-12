from rest_framework.exceptions import AuthenticationFailed

import jwt

from user_api.models import User


def auth_user(request=None, token=None):
    if token is None:
        if request.COOKIES.get('token'):
            token = request.COOKIES.get('token')
        else:
            token = request.headers.get('token')
            if not token:
                token = request.headers.get('Authorization')

        if not token:
            raise AuthenticationFailed({
                'status': False,
                'message': 'User need to login',
            })

    try:
        if type(token) == str:
            token_data = token
        else:
            token_data = str(token, "utf-8")

        if token_data.startswith('Bearer '):
            token_data = token_data[7:]

        payload = jwt.decode(token_data, 'secret', algorithms=['HS256'])

    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed({
            'status': False,
            'message': 'Login again',
        })

    try:
        user = User.objects.get(id=payload['id'])
    except Exception as e:
        raise AuthenticationFailed({
            'status': False,
            'message': 'User not found',
        })

    return user