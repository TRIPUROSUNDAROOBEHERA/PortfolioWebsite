from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Project
from .serializers import ProjectSerializer, ProjectSummarySerializer
from .permissions import IsAdminOrReadOnly
from .filters import ProjectFilter
from .services import reorder_projects


class ProjectViewSet(viewsets.ModelViewSet):
    """
    CRUD API ViewSet for Projects:
    - GET  /api/projects/             -> List all (supports ?category= & ?search=)
    - POST /api/projects/             -> Create project (Admin only)
    - GET  /api/projects/<slug>/      -> Retrieve single project by slug
    - PUT/PATCH /api/projects/<slug>/ -> Update project (Admin only)
    - DELETE /api/projects/<slug>/    -> Remove project (Admin only)
    - GET  /api/projects/featured/    -> Featured projects for Home view
    - POST /api/projects/reorder/     -> Reorder cards rank (Admin only)
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    lookup_field = 'slug'

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = ProjectFilter
    search_fields = ['title', 'description', 'technologies']
    ordering_fields = ['order', 'created_at', 'title']
    ordering = ['order', '-created_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return ProjectSummarySerializer
        return ProjectSerializer

    @action(detail=False, methods=['get'], url_path='featured')
    def featured(self, request):
        featured_projects = Project.objects.filter(is_featured=True)
        serializer = ProjectSummarySerializer(featured_projects, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='reorder', permission_classes=[IsAdminOrReadOnly])
    def reorder(self, request):
        order_data = request.data.get('orders', [])
        if not isinstance(order_data, list):
            return Response({'error': 'Expected a list of {"id": int, "order": int}'}, status=status.HTTP_400_BAD_REQUEST)
        
        reorder_projects(order_data)
        return Response({'message': 'Projects reordered successfully.'}, status=status.HTTP_200_OK)