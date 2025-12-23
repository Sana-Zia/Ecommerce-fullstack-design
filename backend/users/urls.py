from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import UserProfileView

urlpatterns = [
    # This is LOGIN endpoint (POST username and password here)
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Using this to get a new access token when the old one expires
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # profile endpoint
    path('me/', UserProfileView.as_view(), name='user-profile'),
]