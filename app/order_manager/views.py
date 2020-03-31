from django.contrib.auth.models import User, Group
from rest_framework import generics, viewsets, permissions, status
from order_manager.models import  Waiver, Order
from order_manager.serializers import UserSerializer, GroupSerializer,  OrderSerializer, WaiverSerializer


# Allows any authenticated user to access all user data
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('id')
    serializer_class = UserSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

# Only admin users can access group information
class GroupViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [
        permissions.IsAdminUser
    ]

# class ClientViewSet(viewsets.ModelViewSet):
#     queryset = Client.objects.all().order_by('user')
#     serializer_class = ClientSerializer
#     permission_classes =[
#         permissions.IsAuthenticated
#     ]

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



