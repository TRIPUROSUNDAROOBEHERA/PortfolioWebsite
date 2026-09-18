from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Publication
from .serializers import PublicationSerializer, PublicationSummarySerializer
from .permissions import IsAdminOrReadOnly
from .services import get_featured_publications, reorder_publications


class PublicationViewSet(viewsets.ModelViewSet):
    """
    API ViewSet for Publications:
    - GET    /api/publications/          -> List publications
    - POST   /api/publications/          -> Create new publication (Admin only)
    - GET    /api/publications/<slug>/   -> View single publication detail
    - PUT    /api/publications/<slug>/   -> Update publication (Admin only)
    - DELETE /api/publications/<slug>/   -> Delete publication (Admin only)
    - GET    /api/publications/featured/ -> Featured publications
    - POST   /api/publications/reorder/  -> Reorder items (Admin only)
    """
    queryset = Publication.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    lookup_field = 'slug'

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['publication_type', 'is_featured']
    search_fields = ['title', 'authors', 'journal_or_conference', 'abstract', 'doi']
    ordering_fields = ['order', 'published_date', 'citation_count']
    ordering = ['order', '-published_date']

    def get_serializer_class(self):
        if self.action == 'list':
            return PublicationSummarySerializer
        return PublicationSerializer

    @action(detail=False, methods=['get'], url_path='featured')
    def featured(self, request):
        featured_pubs = get_featured_publications()
        serializer = PublicationSummarySerializer(featured_pubs, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='reorder', permission_classes=[IsAdminOrReadOnly])
    def reorder(self, request):
        order_data = request.data.get('orders', [])
        if not isinstance(order_data, list):
            return Response(
                {'error': 'Expected a list of objects with "id" and "order".'},
                status=status.HTTP_400_BAD_REQUEST
            )
        reorder_publications(order_data)
        return Response({'message': 'Publications reordered successfully.'}, status=status.HTTP_200_OK)