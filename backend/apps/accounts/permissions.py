from rest_framework import permissions


class IsSuperAdmin(permissions.BasePermission):
    """Allows access only to Super Admins."""

    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.is_superuser or request.user.role == 'SUPER_ADMIN')
        )


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Public viewers can read (GET, HEAD, OPTIONS);
    Authenticated staff can create, update, and delete (POST, PUT, PATCH, DELETE).
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)