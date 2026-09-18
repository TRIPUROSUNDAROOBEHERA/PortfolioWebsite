from rest_framework import permissions


class IsAdminOrMessageSenderOnly(permissions.BasePermission):
    """
    - POST (Create message): Publicly accessible to all visitors.
    - GET, PUT, PATCH, DELETE: Restricted to authenticated admin/staff users.
    """

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)