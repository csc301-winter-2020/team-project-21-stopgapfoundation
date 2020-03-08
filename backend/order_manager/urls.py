from django.urls import path, include
from rest_framework import routers
from order_manager import views


router = routers.DefaultRouter()
router.register(r'client-information', views.ClientInformationViewSet)
router.register(r'order-information', views.OrderInformationViewSet)
router.register(r'waiver-information', views.WaiverInformationViewSet)

urlpatterns =[
    path('', include(router.urls))
]