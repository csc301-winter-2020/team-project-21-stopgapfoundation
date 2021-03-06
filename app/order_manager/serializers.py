from django.contrib.auth import get_user_model
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import Waiver, Order
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


UserModel = get_user_model()

class UserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, data):
        user = UserModel.objects.create(
            username = data['username'],
            first_name = data['first_name'],
            last_name = data['last_name']
        )
        user.set_password(data['password'])
        user.save()

        return user

    class Meta:
        model = User
        fields = [
            'pk',
            'username',
            'password',
            'first_name',
            'last_name',
            'email',
            'groups',
            'is_staff',
            'is_active',
            'is_superuser',
            'date_joined'
        ]

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    members = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Group
        fields =[
            'url',
            'name',
            'members'
        ]

class WaiverSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(
        many=False,
        read_only=True
    )
    
    class Meta:
        model = Waiver
        fields = [
            'pk',
            'user',
            'date',
            'signatory_first_name',
            'signatory_last_name',
            'signatory_signature',
            'witness_first_name',
            'witness_last_name',
            'witness_signature',
            'order'
        ]

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            'pk',
            'user',
            'first_name',
            'last_name',
            'email',
            'company',
            'phone_number',
            'date_created',
            'billing_address',
            'shipping_address',
            'waiver',
            'entryway_photo',
            'step_left_photo',
            'step_right_photo',
            'step_left_height',
            'step_right_height',
            'ramp_colour',
            'delivery_method',
            'subsidize',
            'status',
            'notes'
        ]

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # The default result (access/refresh tokens)
        data = super(CustomTokenObtainPairSerializer, self).validate(attrs)
        # Custom data you want to include
        data.update({'user': self.user.username})
        # data.update({'id': self.user.id})

        # TODO: if this is inconsidtent, try self.user.is_staff instead.
        data.update({'isAdmin': self.user.is_superuser })
        # and everything else you want to send in the response
        return data