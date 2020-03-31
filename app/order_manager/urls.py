from django.urls import path, include
from rest_framework import routers
from order_manager import views


router = routers.DefaultRouter()
# router.register(r'client-information', views.ClientViewSet)
router.register(r'order-information', views.OrderViewSet)
router.register(r'waiver-information', views.WaiverViewSet)

urlpatterns =[
    path('', include(router.urls))
]