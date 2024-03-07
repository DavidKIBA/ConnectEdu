from django.urls import path 
from . import views

urlpatterns = [
    path('news-letters', views.NewsLetterView.as_view(), name='newsletters')
]