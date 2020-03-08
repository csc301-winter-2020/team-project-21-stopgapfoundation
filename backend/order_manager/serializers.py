from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Client, Waiver, Order

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [
            'url',
            'username',
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
    class Meta:
        model = Group
        fields =[
            'url',
            'name'
        ]

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client

        fields = [
            'user',
            'company',
            'phone_number',
            'address',
            'website'
        ]

class WaiverSerializer(serializers.ModelSerializer):
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
            'witness_signature'
        ]

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order

        fields = [
            'pk',
            'user',
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
            'subsidize'
        ]