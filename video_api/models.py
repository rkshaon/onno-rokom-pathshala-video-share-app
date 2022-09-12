from django.db import models

class Videoes(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    youtube_video_id = models.CharField(max_length=255, null=False, blank=False, unique=True)
    link = models.TextField(null=False, blank=False)
    embed_link = models.TextField(null=False, blank=False)
    views_count = models.BigIntegerField(default=0)
    uploaded_by = models.ForeignKey('user_api.User', on_delete=models.CASCADE)
    uploaded_date_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.uploaded_by.name) + " " + str(self.name) + " " + str(self.youtube_video_id)

class VideoLikeDislike(models.Model):
    video_id = models.ForeignKey('video_api.Videoes', on_delete=models.CASCADE)
    like = models.BooleanField(default=False)
    dislike = models.BooleanField(default=False)
    given_by = models.ForeignKey('user_api.User', on_delete=models.CASCADE)
    given_date_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.video_id.youtube_video_id) + " " + str(self.given_by.name)