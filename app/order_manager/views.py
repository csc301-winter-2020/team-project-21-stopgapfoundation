from django.contrib.auth.models import User, Group
from rest_framework import generics, viewsets, permissions, status
from order_manager.models import  Waiver, Order
from order_manager.serializers import UserSerializer, GroupSerializer, OrderSerializer, WaiverSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# TODO: Need to limit viewset access based on user pk

# Allows any authenticated user to access all user data
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = [
        permissions.AllowAny
    ]

# Only admin users can access group information
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [
        permissions.IsAdminUser
    ]

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('date_created')
    serializer_class = OrderSerializer
    permission_classes =[
        permissions.IsAuthenticated
    ]

class WaiverViewSet(viewsets.ModelViewSet):
    queryset = Waiver.objects.all().order_by('user')
    serializer_class = WaiverSerializer
    permission_classes =[
        permissions.IsAuthenticated
    ]

class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer