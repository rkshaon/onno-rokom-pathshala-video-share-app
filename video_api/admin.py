from django.contrib import admin

from video_api.models import Videoes
from video_api.models import VideoLikeDislike


admin.site.register(Videoes)
admin.site.register(VideoLikeDislike)