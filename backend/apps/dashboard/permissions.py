from rest_framework import permissions


class IsAdminUserOnly(permissions.BasePermission):
    """Strictly limits dashboard metrics, analytics, and overview endpoints to staff/admin."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)