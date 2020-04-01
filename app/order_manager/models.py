from django.db import models
from django.contrib.auth.models import User
import datetime

# Use this method to get the directory to store a user's photos
def user_directory_path(instance, filename):
    return "data/user_{0}/step_photos/{1}".format(instance.user.id, filename)


# Store a single waiver instance with this model
# Every ramp request will have its own waiver
class Waiver(models.Model):
    # Reference to associated client
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    # Date of waiver creation/completion (assumed to be at the same time)
    date = models.DateField(auto_now_add=True, blank=True)

    # Name and signature of owner or manager
    signatory_first_name = models.CharField(max_length=30, default="")
    signatory_last_name = models.CharField(max_length=150, default="")
    signatory_signature = models.CharField(max_length=180, default="")  # Use full name as e-signature

    # Name and signature of witness
    witness_first_name = models.CharField(max_length=30, default="")
    witness_last_name = models.CharField(max_length=150, default="")
    witness_signature = models.CharField(max_length=180, default="")    # Use full name as e-signature

class Order(models.Model):
    # Reference to associated client
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    # User information
    first_name =  models.CharField(max_length=30, default="")
    last_name = models.CharField(max_length=150, default="")
    email = models.CharField(max_length=180, default="")
    company = models.CharField(max_length=180, default="")
    phone_number = models.CharField(max_length=15, default="")

    # Date of order creation
    date_created = models.DateField(auto_now_add=True, blank=True)

    # Address information
    billing_address = models.CharField(max_length=180, default="")
    shipping_address = models.CharField(max_length=180, default="")

    # Waiver information
    waiver = models.OneToOneField(
        Waiver,
        on_delete=models.CASCADE,
        primary_key=True
    )

    # Ramp information; height information stored in inches
    entryway_photo = models.ImageField(upload_to=user_directory_path)
    step_left_photo = models.ImageField(upload_to=user_directory_path)
    step_right_photo = models.ImageField(upload_to=user_directory_path)
    step_left_height = models.DecimalField(max_digits=4, decimal_places=2)
    step_right_height = models.DecimalField(max_digits=4, decimal_places=2)
    ramp_colour = models.CharField(max_length=50, default="")
    
    # Additional information
    delivery_method = models.CharField(max_length=50, default="")
    subsidize = models.BooleanField(default=False)
    
    # Status information
    status = models.CharField(max_length=180, default="")
    notes = models.CharField(max_length=180, default="")
