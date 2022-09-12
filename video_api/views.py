from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from video_share_app.utility import auth_user

from video_api.serializers import VideoSerializer

from video_api.models import Videoes
from video_api.models import VideoLikeDislike


@api_view(['GET'])
def get_all_videoes(request):
    data = VideoSerializer(Videoes.objects.all().order_by('-id'), many=True).data

    return Response({
        'status': True,
        'data': data,
    })


@api_view(['POST'])
def upload_video_api(request):
    if 'token' not in request.data:
        return Response({
            'status': False,
            'message': 'Token required!'
        }, status=status.HTTP_403_FORBIDDEN)

    token = request.data['token']
    user = auth_user(token=token)
    
    data = request.data
    # https://www.youtube.com/watch?v=7T7iE9eZJKE
    # https://www.youtube.com/embed/7T7iE9eZJKE
    video_id = data['link'].split('?v=')[1]
    temp_data = {
        'name': data['name'],
        'link': data['link'],
        'youtube_video_id': video_id,
        'embed_link': 'https://www.youtube.com/embed/' + video_id,
        'uploaded_by': user.id,
    }

    video_serializer = VideoSerializer(data=temp_data)

    if video_serializer.is_valid():
        video_serializer.save()
        data = video_serializer.data
    else:
        print('Errors: ', video_serializer.errors)
        return Response({
            'status': False,
            'message':  video_serializer.errors,
        }, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    return Response({
        'status': True,
        'data': data,
    })


@api_view(['GET'])
def get_uploaded_videoes(request):
    user = auth_user(request)
    data = VideoSerializer(Videoes.objects.filter(uploaded_by=user).order_by('-uploaded_date_time'), many=True).data
    
    return Response({
        'status': True,
        'data': data,
    })


@api_view(['GET'])
def get_video_details(request, video_id):
    data = VideoSerializer(Videoes.objects.get(youtube_video_id=video_id), many=False).data

    return Response({
        'status': True,
        'data': data,
    })

@api_view(['POST'])
def increase_video_view_count(request, video_id):
    video = Videoes.objects.get(youtube_video_id=video_id)

    video.views_count += 1
    video.save()

    return Response({
        'status': True
    })


@api_view(['POST'])
def like_or_dislike_video(request, video_id):
    user = auth_user(request)
    video = Videoes.objects.get(youtube_video_id=video_id)

    likeordislike, created = VideoLikeDislike.objects.get_or_create(video_id=video, given_by=user)

    likeordislike.like = request.data['like']
    likeordislike.dislike = request.data['dislike']

    likeordislike.save()

    return Response({
        'status': True
    })
