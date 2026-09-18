from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Safe methods (GET, HEAD, OPTIONS) are open to public/unauthenticated visitors.
    Write methods (POST, PUT, PATCH, DELETE) require authenticated staff/admin credentials.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class IsSuperAdminOnly(permissions.BasePermission):
    """Restricts view execution exclusively to superusers / Super Admins."""

    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.is_superuser or getattr(request.user, 'role', '') == 'SUPER_ADMIN')
        )