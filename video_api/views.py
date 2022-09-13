from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

import operator

from video_share_app.utility import auth_user

from video_api.serializers import VideoSerializer
from video_api.serializers import VideoLikedOrDislikedSerializer

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
    video = Videoes.objects.get(youtube_video_id=video_id)
    data = VideoSerializer(video, many=False).data
    liked = VideoLikeDislike.objects.filter(video_id=video, like=True)
    disliked = VideoLikeDislike.objects.filter(video_id=video, dislike=True)
    
    data['liked'] = VideoLikedOrDislikedSerializer(liked, many=True).data
    data['disliked'] = VideoLikedOrDislikedSerializer(disliked, many=True).data
    
    # print('request: ', request)
    token = request.headers.get('token')
    if token is None:
        token = token = request.COOKIES.get('token')
    if token is None:
        token = request.headers.get('Authorization')
    print("it's token: ", token)
    if token is not None:
        user = auth_user(request)
        # data['self_liked'] = VideoLikedOrDislikedSerializer()
        one = VideoLikeDislike.objects.filter(video_id=video, like=True, given_by=user)
        two = VideoLikeDislike.objects.filter(video_id=video, dislike=True, given_by=user)

        print(len(one))
        print(len(two))
        # data['self_liked'] = 
        print('then get soemthing')
        data['self_liked'] = True if len(VideoLikeDislike.objects.filter(video_id=video, like=True, given_by=user)) > 0 else False
        data['self_disliked'] = True if len(VideoLikeDislike.objects.filter(video_id=video, dislike=True, given_by=user)) > 0 else False
    else:
        data['self_liked'] = False
        data['self_disliked'] = False
        print('token is empty!')

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
    like_dislike_data = request.data
    video = Videoes.objects.get(youtube_video_id=video_id)

    likeordislike, created = VideoLikeDislike.objects.get_or_create(video_id=video, given_by=user)

    # likeordislike.like = request.data['like']
    # likeordislike.dislike = request.data['dislike']

    # likeordislike.save()
    print('user: ', user)
    print('front-end-data: ', like_dislike_data)
    print('instance: ', likeordislike)
    print('create-status: ', created)

    print('like-type: ', type(like_dislike_data['like']), type(likeordislike.like))
    print('dislike-type: ', type(like_dislike_data['dislike']), type(likeordislike.dislike))

    if str(likeordislike.like).lower() != like_dislike_data['like']:
        print('like-status-does-not-matched')
        likeordislike.like = operator.not_(likeordislike.like)
    else:
        print('like-status-matched')
    
    if str(likeordislike.dislike).lower() != like_dislike_data['dislike']:
        print('dislike-status-does-not-matched!')
        likeordislike.dislike = operator.not_(likeordislike.dislike)
    else:
        print('dislike-status-matched')
    
    likeordislike.save()

    return Response({
        'status': True
    })
