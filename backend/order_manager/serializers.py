from django.db import migrations
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ClientInformation


def create_data(apps, schema_editor):
    Client = apps.get_model('client', 'ClientInformation')
    Client(company="Stopgap", phone_num="24149810981-84", address="777 bay", website="www.00000000.com").save()

class Migration(migrations.Migration):

    dependencies = [
        ('client', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]

class ClientSerializer(serializers.Serializer):

    class Meta:
        model = ClientInformation
        fields = ('id', 'user', 'company', 'phone_num','address','website')
