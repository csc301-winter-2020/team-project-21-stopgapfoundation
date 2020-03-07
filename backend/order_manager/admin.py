from django.contrib import admin

# Register your models here.
from .models import ClientInformation, Order, Waiver

admin.site.register(ClientInformation)
admin.site.register(Order)
admin.site.register(Waiver)
