from rest_framework import generics, status
from .models import NewsLetters
from .serializer import NewsLetterSerializer
# Create your views here.

class NewsLetterView(generics.CreateAPIView):

    queryset = NewsLetters.objects.all()
    serializer_class = NewsLetterSerializer
