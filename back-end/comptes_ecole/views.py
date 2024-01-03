from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .serializers import EcoleSerializer, ResponsableSerializer
from .models import Ecoles, ResponsableEcole

# Create your views here.


@api_view(['POST'])
def inscription_ecole(request):

    data = EcoleSerializer(data=request.data)
    if data.is_valid(raise_exception=True):
        data.save()
        return Response(data.data)
    return Response({'details': 'instance is not valid'})


class InscriptionEcole(generics.CreateAPIView):

    queryset = Ecoles.objects.all()
    serializer_class = EcoleSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class InscriptionResponsable(generics.CreateAPIView):

    queryset = ResponsableEcole.objects.all()
    serializer_class = ResponsableSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)