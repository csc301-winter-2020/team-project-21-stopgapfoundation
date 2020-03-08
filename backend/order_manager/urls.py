from django.urls import path

from . import views

urlpatterns =[
    path('client-information/', views.ClientInformationListCreate.as_view()),
    path('order-information/', views.OrderListCreate.as_view()),
    path('waiver-information/', views.WaiverListCreate.as_view())
]