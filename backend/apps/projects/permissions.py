from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Public users: Read-only access (GET, HEAD, OPTIONS).
    Admin/Staff users: Full access (POST, PUT, PATCH, DELETE).
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)