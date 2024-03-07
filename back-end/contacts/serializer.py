from rest_framework.serializers import ModelSerializer
from .models import NewsLetters


class NewsLetterSerializer(ModelSerializer):

    class Meta:
        model = NewsLetters
        fields = ("__all__")