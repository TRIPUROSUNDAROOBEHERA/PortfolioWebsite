from rest_framework import permissions


class IsAdminUserOnly(permissions.BasePermission):
    """Strictly restricts access to authenticated admin/staff users."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)