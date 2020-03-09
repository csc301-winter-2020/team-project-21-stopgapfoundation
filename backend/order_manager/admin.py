from django.contrib import admin

# Register your models here.
from .models import Client, Order, Waiver

admin.site.register(Client)
admin.site.register(Order)
admin.site.register(Waiver)
