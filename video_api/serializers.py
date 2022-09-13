from rest_framework import serializers

from video_api.models import Videoes
from video_api.models import VideoLikeDislike

from user_api.serializers import UserSerializer


class VideoSerializer(serializers.ModelSerializer):
    uploaded_by = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Videoes
        fields = '__all__'


class VideoSerializerWithMoreDetails(serializers.ModelSerializer):
    uploaded_by = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Videoes
        fields = '__all__'
    
    


class VideoLikedOrDislikedSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoLikeDislike
        fields = '__all__'