from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import ResearchPaper
from .serializers import ResearchPaperSerializer, ResearchPaperSummarySerializer
from .permissions import IsAdminOrReadOnly
from .services import get_featured_research, reorder_research


class ResearchPaperViewSet(viewsets.ModelViewSet):
    """
    API ViewSet for Research & Papers:
    - GET    /api/research/          -> List all research papers
    - POST   /api/research/          -> Create new research paper (Admin only)
    - GET    /api/research/<slug>/   -> View detailed paper
    - PUT    /api/research/<slug>/   -> Update paper (Admin only)
    - DELETE /api/research/<slug>/   -> Delete paper (Admin only)
    - GET    /api/research/featured/ -> Featured research for portfolio
    - POST   /api/research/reorder/  -> Reorder items (Admin only)
    """
    queryset = ResearchPaper.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    lookup_field = 'slug'

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'field_of_study', 'is_featured']
    search_fields = ['title', 'abstract', 'authors', 'field_of_study']
    ordering_fields = ['order', 'published_date', 'created_at']
    ordering = ['order', '-created_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return ResearchPaperSummarySerializer
        return ResearchPaperSerializer

    @action(detail=False, methods=['get'], url_path='featured')
    def featured(self, request):
        featured_papers = get_featured_research()
        serializer = ResearchPaperSummarySerializer(featured_papers, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='reorder', permission_classes=[IsAdminOrReadOnly])
    def reorder(self, request):
        order_data = request.data.get('orders', [])
        if not isinstance(order_data, list):
            return Response({'error': 'Expected a list of objects with "id" and "order".'}, status=status.HTTP_400_BAD_REQUEST)
        
        reorder_research(order_data)
        return Response({'message': 'Research papers reordered successfully.'}, status=status.HTTP_200_OK)