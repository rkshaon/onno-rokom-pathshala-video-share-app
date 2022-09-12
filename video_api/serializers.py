from rest_framework import serializers

from video_api.models import Videoes
from video_api.models import VideoLikeDislike


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Videoes
        fields = '__all__'

class VideoLikedOrDislikedSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoLikeDislike
        fields = '__all__'