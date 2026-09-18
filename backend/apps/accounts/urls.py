from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import (
    AdminLoginView,
    CurrentUserView,
    ChangePasswordView,
    HealthCheckView,
)

urlpatterns = [
    # Login routes (matches both /api/auth/login/ and direct /api/login/)
    path('login/', AdminLoginView.as_view(), name='admin_login'),
    path('auth/login/', AdminLoginView.as_view(), name='admin_login_alias'),
    
    # Profile & settings
    path('me/', CurrentUserView.as_view(), name='current_user'),
    path('auth/me/', CurrentUserView.as_view(), name='current_user_alias'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),

    # Health check
    path('health/', HealthCheckView.as_view(), name='health_check'),

    # SimpleJWT token routes
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh_alt'),
    path('verify/', TokenVerifyView.as_view(), name='token_verify'),
]