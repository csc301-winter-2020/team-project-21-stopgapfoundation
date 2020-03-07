from django.shortcuts import render


from .models import  Order,ClientInformation,Waiver
from .serializers import *
from rest_framework import generics

class ClientListCreate(generics.ListCreateAPIView):
    queryset = ClientInformation.objects.all()
    serializer_class = ClientSerializer

