from rest_framework import serializers

from video_api.models import Videoes

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Videoes
        fields = '__all__'