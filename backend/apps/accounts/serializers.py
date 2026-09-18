from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .services import record_successful_login

User = get_user_model()


class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom JWT login serializer that returns user details with tokens."""

    def validate(self, attrs):
        data = super().validate(attrs)

        if not self.user.is_staff and not self.user.is_superuser:
            raise serializers.ValidationError("Access denied. Admin credentials required.")

        request = self.context.get('request')
        if request:
            record_successful_login(self.user, request)

        data['user'] = {
            'id': self.user.id,
            'email': self.user.email,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'full_name': self.user.full_name,
            'role': self.user.role,
            'is_superuser': self.user.is_superuser,
            'is_staff': self.user.is_staff,
        }
        return data


class UserSerializer(serializers.ModelSerializer):
    """User profile serializer for admin self-management."""

    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'role',
            'avatar',
            'is_staff',
            'is_active',
            'last_login',
            'last_login_ip',
            'created_at',
        ]
        read_only_fields = ['id', 'role', 'is_staff', 'is_active', 'last_login', 'last_login_ip', 'created_at']


class ChangePasswordSerializer(serializers.Serializer):
    """Serializer for admin password modification."""

    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True, min_length=8)