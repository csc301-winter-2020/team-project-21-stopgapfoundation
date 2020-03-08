from django.contrib.auth.models import User, Group
from django.shortcuts import render
from rest_framework import generics, viewsets, permissions

from .models import ClientInformation, Waiver, Order
from .serializers import UserSerializer, GroupSerializer, ClientInformationSerializer,OrderSerializer,WaiverSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

class ClientInformationListCreate(generics.ListCreateAPIView):
    queryset = ClientInformation.objects.all()
    serializer_class = ClientInformationSerializer
    permission_classes =[
        permissions.IsAuthenticated
    ]

class OrderListCreate(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes =[
        permissions.IsAuthenticated
    ]

class WaiverListCreate(generics.ListCreateAPIView):
    queryset = Waiver.objects.all()
    serializer_class = WaiverSerializer
    permission_classes =[
        permissions.IsAuthenticated
    ]