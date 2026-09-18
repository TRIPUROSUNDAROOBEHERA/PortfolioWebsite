from django.contrib.auth import get_user_model
from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


class AdminLoginView(APIView):
    """
    POST /api/auth/login/
    Authenticates via Username OR Email address.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        identifier = (
            request.data.get('username') or 
            request.data.get('email') or 
            ''
        ).strip()
        password = request.data.get('password', '')

        if not identifier or not password:
            return Response(
                {'error': 'Username/Email and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 1. Find user by email or by username
        user = None
        if '@' in identifier:
            user = User.objects.filter(email__iexact=identifier).first()
        
        if user is None:
            user = User.objects.filter(username__iexact=identifier).first()

        # 2. Check password
        if user and user.check_password(password):
            # Verify active & staff/superuser permissions
            if not user.is_active:
                return Response(
                    {'error': 'This account has been disabled.'},
                    status=status.HTTP_403_FORBIDDEN
                )

            if not (user.is_staff or user.is_superuser):
                return Response(
                    {'error': 'Access denied. Administrator privileges required.'},
                    status=status.HTTP_403_FORBIDDEN
                )

            # 3. Generate SimpleJWT access & refresh tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'is_superuser': user.is_superuser,
                    'is_staff': user.is_staff,
                }
            }, status=status.HTTP_200_OK)

        return Response(
            {'error': 'Invalid email/username or password.'},
            status=status.HTTP_401_UNAUTHORIZED
        )


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_superuser': user.is_superuser,
            'is_staff': user.is_staff,
        }, status=status.HTTP_200_OK)


AdminProfileView = CurrentUserView


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get('old_password', '')
        new_password = request.data.get('new_password', '')

        if not old_password or not new_password:
            return Response(
                {'error': 'Both old and new passwords are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not user.check_password(old_password):
            return Response(
                {'error': 'Current password does not match.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.set_password(new_password)
        user.save()

        return Response({'message': 'Password updated successfully.'}, status=status.HTTP_200_OK)


class HealthCheckView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        db_status = "Healthy (Local)"
        try:
            connection.ensure_connection()
        except Exception:
            db_status = "Database Disconnected"

        return Response({
            'status': 'healthy',
            'backend': 'Online',
            'database': db_status,
            'architecture': 'Django 5.1 + REST'
        }, status=status.HTTP_200_OK)