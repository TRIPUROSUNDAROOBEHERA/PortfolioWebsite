from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import AuditLog
from .serializers import AuditLogSerializer
from .permissions import IsAdminUserOnly


class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API ViewSet for Audit Logs (Read-Only to preserve log integrity):
    - GET    /api/audit-logs/          -> List all system audit logs
    - GET    /api/audit-logs/<id>/     -> View single audit log detail
    - GET    /api/audit-logs/recent/   -> 10 most recent activity logs for dashboard
    - POST   /api/audit-logs/clear/    -> SuperAdmin only: purge older logs
    """
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
    permission_classes = [IsAdminUserOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['action', 'module']
    search_fields = ['user_email', 'module', 'description', 'ip_address']
    ordering_fields = ['created_at', 'action', 'module']
    ordering = ['-created_at']

    @action(detail=False, methods=['get'], url_path='recent')
    def recent(self, request):
        recent_logs = AuditLog.objects.all()[:10]
        serializer = self.get_serializer(recent_logs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='clear')
    def clear_logs(self, request):
        if not request.user.is_superuser:
            return Response({'error': 'SuperAdmin permissions required.'}, status=status.HTTP_403_FORBIDDEN)
        
        count = AuditLog.objects.count()
        AuditLog.objects.all().delete()
        return Response({'message': f'Successfully cleared {count} audit logs.'}, status=status.HTTP_200_OK)