from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Resource
from .serializers import ResourceSerializer, ResourceSummarySerializer
from .permissions import IsAdminOrReadOnly
from .services import get_grouped_resources, increment_resource_download


class ResourceViewSet(viewsets.ModelViewSet):
    """
    API ViewSet for Resources:
    - GET    /api/resources/              -> List resources (filterable by resource_type)
    - POST   /api/resources/              -> Create new resource (Admin only)
    - GET    /api/resources/<id>/         -> Get single resource detail
    - PUT    /api/resources/<id>/         -> Update resource (Admin only)
    - DELETE /api/resources/<id>/         -> Delete resource (Admin only)
    - GET    /api/resources/grouped/      -> Active resources for Home card
    - POST   /api/resources/<id>/download/ -> Record download count
    """
    queryset = Resource.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['resource_type', 'is_active']
    search_fields = ['title', 'description']
    ordering_fields = ['order', 'download_count', 'created_at']
    ordering = ['order', '-created_at']

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return Resource.objects.all()
        return Resource.objects.filter(is_active=True)

    def get_serializer_class(self):
        if self.action == 'list':
            return ResourceSummarySerializer
        return ResourceSerializer

    @action(detail=False, methods=['get'], url_path='grouped')
    def grouped(self, request):
        resources = get_grouped_resources()
        serializer = ResourceSummarySerializer(resources, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], url_path='download')
    def download(self, request, pk=None):
        resource = self.get_object()
        increment_resource_download(resource.id)
        resource.refresh_from_db(fields=['download_count'])
        return Response({
            'id': resource.id,
            'download_count': resource.download_count,
            'download_url': request.build_absolute_uri(resource.file_attachment.url) if resource.file_attachment else resource.external_url
        }, status=status.HTTP_200_OK)