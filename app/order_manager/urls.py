from django.urls import path, include
from rest_framework import routers
from order_manager import views
from rest_framework_simplejwt import views as jwt_views


router = routers.DefaultRouter()
router.register(r'order-information', views.OrderViewSet)
router.register(r'waiver-information', views.WaiverViewSet)

urlpatterns =[
    path('', include(router.urls)),
    path('api/token/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', jwt_views.TokenVerifyView.as_view(), name='token_verify')
]