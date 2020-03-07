from django.urls import path

from order_manager import views

urlpatterns =[
    path('api/client-information/', views.ClientInformationListCreate.as_view())
]