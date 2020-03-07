from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import ClientInformation, Waiver, Order

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

class ClientInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientInformation

        fields = [
            #'id',
            'user',
            #'username',
            #'first_name',
            #'last_name',
            #'password',
            #'email',
            #'is_staff',
            #'is_active',
            'company',
            'phone_number',
            'address',
            'website'
        ]

"""

# Store a single waiver instance with this model
# Every ramp request will have its own waiver
class Waiver(models.Model):
    # Reference to associated client
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    # Date of waiver creation/completion (assumed to be at the same time)
    date = models.DateField(auto_now_add=True)

    # Name and signature of owner or manager
    signatory_first_name = models.CharField(max_length=30)
    signatory_last_name = models.CharField(max_length=150)
    signatory_signature = models.CharField(max_length=180)  # Use full name as e-signature

    # Name and signature of witness
    witness_first_name = models.CharField(max_length=30)
    witness_last_name = models.CharField(max_length=150)
    witness_signature = models.CharField(max_length=180)    # Use full name as e-signature


class Order(models.Model):
    # Reference to associated client
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    # Address information
    billing_address = models.CharField(max_length=180)
    shipping_address = models.CharField(max_length=180)

    # Waiver information
    waiver = models.OneToOneField(
        Waiver,
        on_delete=models.CASCADE,
        primary_key=True
    )
    waiver_confirmation = models.BooleanField(default=False)

    # Ramp information; height information stored in inches
    entryway_photo = models.ImageField(upload_to=user_directory_path)
    step_left_photo = models.ImageField(upload_to=user_directory_path)
    step_right_photo = models.ImageField(upload_to=user_directory_path)
    step_left_height = models.DecimalField(max_digits=4, decimal_places=2)
    step_right_height = models.DecimalField(max_digits=4, decimal_places=2)
    ramp_colour = models.CharField(max_length=50)
    
    # Additional information
    delivery_method = models.CharField(max_length=50)
    subsidize = models.BooleanField(default=False)

"""
