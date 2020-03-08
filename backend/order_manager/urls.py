from django.urls import path

from . import views

urlpatterns =[
    path('api/client-information/', views.ClientInformationListCreate.as_view()),
    path('api/order-information/', views.OrderListCreate.as_view()),
    path('api/waiver-information/', views.WaiverListCreate.as_view())
]