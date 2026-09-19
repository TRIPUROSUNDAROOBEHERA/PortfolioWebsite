from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Notification
from .serializers import NotificationSerializer
from .permissions import IsAdminUserOnly
from .services import mark_all_notifications_as_read


class NotificationViewSet(viewsets.ModelViewSet):
    """
    API ViewSet for Admin Notifications:
    - GET    /api/notifications/               -> List alerts (filtered by status)
    - GET    /api/notifications/<id>/          -> Get single notification (marks as read)
    - PATCH  /api/notifications/<id>/          -> Toggle is_read status
    - DELETE /api/notifications/<id>/          -> Delete notification
    - GET    /api/notifications/unread-count/  -> Get integer badge count for navbar bell
    - POST   /api/notifications/mark-all-read/ -> Mark all alerts as read
    """
    permission_classes = [IsAdminUserOnly]
    serializer_class = NotificationSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['is_read', 'notification_type', 'level']
    search_fields = ['title', 'message']
    ordering_fields = ['created_at', 'is_read']
    ordering = ['-created_at']

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Notification.objects.all()
        return Notification.objects.filter(Q(recipient=user) | Q(recipient__isnull=True))

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if not instance.is_read:
            instance.is_read = True
            instance.save(update_fields=['is_read'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='unread-count')
    def unread_count(self, request):
        count = self.get_queryset().filter(is_read=False).count()
        return Response({'unread_count': count}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='mark-all-read')
    def mark_all_read(self, request):
        updated_count = mark_all_notifications_as_read(user=request.user)
        return Response({
            'message': 'All notifications marked as read.',
            'updated_count': updated_count
        }, status=status.HTTP_200_OK)