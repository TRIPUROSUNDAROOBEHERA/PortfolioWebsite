from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import ContactMessage
from .serializers import ContactMessageCreateSerializer, ContactMessageAdminSerializer
from .permissions import IsAdminOrMessageSenderOnly
from .services import get_client_ip, send_contact_email_notification


class ContactMessageViewSet(viewsets.ModelViewSet):
    """
    API ViewSet for Contact Messages:
    - POST   /api/contact/            -> Public: Send a message from 'Let's Connect'
    - GET    /api/contact/            -> Admin: List messages with search & status filters
    - GET    /api/contact/<id>/       -> Admin: View specific message (auto-marks read)
    - PATCH  /api/contact/<id>/       -> Admin: Update read/archived status
    - DELETE /api/contact/<id>/       -> Admin: Delete message
    - GET    /api/contact/unread-count/ -> Admin: Badge count for unread messages
    """
    queryset = ContactMessage.objects.all()
    permission_classes = [IsAdminOrMessageSenderOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['is_read', 'is_archived']
    search_fields = ['name', 'email', 'subject', 'message']
    ordering_fields = ['created_at', 'is_read']
    ordering = ['-created_at']

    def get_permissions(self):
        # Allow anyone to submit a contact message publicly
        if self.action == 'create':
            return [AllowAny()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == 'create':
            return ContactMessageCreateSerializer
        return ContactMessageAdminSerializer

    def perform_create(self, serializer):
        client_ip = get_client_ip(self.request)
        contact_instance = serializer.save(ip_address=client_ip)
        
        # Trigger the live email notification
        send_contact_email_notification(contact_instance)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                "status": "success",
                "message": "Message transmitted successfully!",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED
        )

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if not instance.is_read:
            instance.is_read = True
            instance.save(update_fields=['is_read'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='unread-count')
    def unread_count(self, request):
        count = ContactMessage.objects.filter(is_read=False, is_archived=False).count()
        return Response({'unread_count': count}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='toggle-archive')
    def toggle_archive(self, request, pk=None):
        instance = self.get_object()
        instance.is_archived = not instance.is_archived
        instance.save(update_fields=['is_archived'])
        return Response({
            'id': instance.id,
            'is_archived': instance.is_archived,
            'message': f"Message {'archived' if instance.is_archived else 'unarchived'} successfully."
        }, status=status.HTTP_200_OK)