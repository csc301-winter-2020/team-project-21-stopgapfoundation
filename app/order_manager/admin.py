from django.contrib import admin

# Register your models here.
from .models import Order, Waiver

admin.site.register(Order)
admin.site.register(Waiver)