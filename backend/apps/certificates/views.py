from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Certificate
from .serializers import CertificateSerializer, CertificateSummarySerializer
from .permissions import IsAdminOrReadOnly
from .services import get_featured_certificates, reorder_certificates


class CertificateViewSet(viewsets.ModelViewSet):
    """
    API ViewSet for Certificates:
    - GET    /api/certificates/          -> List all certificates
    - POST   /api/certificates/          -> Upload/Create certificate (Admin only)
    - GET    /api/certificates/<id>/     -> View single certificate detail
    - PUT    /api/certificates/<id>/     -> Update certificate (Admin only)
    - PATCH  /api/certificates/<id>/     -> Partial update certificate (Admin only)
    - DELETE /api/certificates/<id>/     -> Delete certificate (Admin only)
    - GET    /api/certificates/featured/ -> Featured certificates for Home widget
    - POST   /api/certificates/reorder/  -> Update sort rank (Admin only)
    """
    queryset = Certificate.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['issuer', 'is_featured']
    search_fields = ['title', 'issuer', 'credential_id']
    ordering_fields = ['order', 'created_at', 'title']
    ordering = ['order', '-created_at']

    def get_serializer_class(self):
        if self.action in ['list', 'featured']:
            return CertificateSummarySerializer
        return CertificateSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return Certificate.objects.all()
        return Certificate.objects.filter(is_featured=True)

    @action(detail=False, methods=['get'], url_path='featured')
    def featured(self, request):
        certificates = get_featured_certificates(limit=4)
        serializer = CertificateSummarySerializer(certificates, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='reorder', permission_classes=[IsAdminOrReadOnly])
    def reorder(self, request):
        order_data = request.data.get('orders', [])
        if not isinstance(order_data, list):
            return Response(
                {'error': 'Expected a list of objects with "id" and "order".'},
                status=status.HTTP_400_BAD_REQUEST
            )
        reorder_certificates(order_data)
        return Response({'message': 'Certificates reordered successfully.'}, status=status.HTTP_200_OK)