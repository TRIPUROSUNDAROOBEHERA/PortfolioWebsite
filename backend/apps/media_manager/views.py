from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import MediaAsset
from .serializers import MediaAssetSerializer
from .permissions import IsAdminOrReadOnly
from .services import delete_physical_file, get_media_storage_stats


class MediaAssetViewSet(viewsets.ModelViewSet):
    """
    API ViewSet for Media Assets:
    - GET    /api/media/          -> List media files with folder filtering
    - POST   /api/media/          -> Upload new image/document (Admin only)
    - GET    /api/media/<id>/     -> View single asset details
    - PATCH  /api/media/<id>/     -> Update title / alt text (Admin only)
    - DELETE /api/media/<id>/     -> Delete asset and remove from disk (Admin only)
    - GET    /api/media/stats/    -> Aggregated storage space statistics
    """
    queryset = MediaAsset.objects.all()
    serializer_class = MediaAssetSerializer
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['folder_category', 'file_type']
    search_fields = ['title', 'alt_text']
    ordering_fields = ['created_at', 'file_size_bytes', 'title']
    ordering = ['-created_at']

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(uploaded_by=user)

    def perform_destroy(self, instance):
        delete_physical_file(instance.file)
        instance.delete()

    @action(detail=False, methods=['get'], url_path='stats')
    def stats(self, request):
        statistics = get_media_storage_stats()
        return Response(statistics, status=status.HTTP_200_OK)