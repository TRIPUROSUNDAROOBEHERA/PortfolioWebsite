from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Public visitors: Read-only access to media asset records (GET, HEAD, OPTIONS).
    Admin/Staff users: Full access (Upload, Replace, Delete).
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)