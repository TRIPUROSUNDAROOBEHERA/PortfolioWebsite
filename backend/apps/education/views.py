from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Education
from .serializers import EducationSerializer, EducationTimelineSerializer
from .permissions import IsAdminOrReadOnly
from .services import get_timeline_education, reorder_education_timeline


class EducationViewSet(viewsets.ModelViewSet):
    """
    API ViewSet for Education Timeline:
    - GET    /api/education/          -> List all records (ordered for timeline)
    - POST   /api/education/          -> Create new qualification record (Admin only)
    - GET    /api/education/<id>/     -> View single education record
    - PUT    /api/education/<id>/     -> Update record (Admin only)
    - PATCH  /api/education/<id>/     -> Partial update record (Admin only)
    - DELETE /api/education/<id>/     -> Delete record (Admin only)
    - GET    /api/education/timeline/ -> Active timeline payload for Home page
    - POST   /api/education/reorder/  -> Update timeline sequence ordering (Admin only)
    """
    queryset = Education.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['is_active', 'icon']
    search_fields = ['degree', 'field_of_study', 'institution']
    ordering_fields = ['order', 'end_year', 'start_year']
    ordering = ['order', '-end_year']

    def get_serializer_class(self):
        if self.action == 'list':
            return EducationTimelineSerializer
        return EducationSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return Education.objects.all()
        return Education.objects.filter(is_active=True)

    @action(detail=False, methods=['get'], url_path='timeline')
    def timeline(self, request):
        records = get_timeline_education()
        serializer = EducationTimelineSerializer(records, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='reorder', permission_classes=[IsAdminOrReadOnly])
    def reorder(self, request):
        order_data = request.data.get('orders', [])
        if not isinstance(order_data, list):
            return Response(
                {'error': 'Expected a list of objects with "id" and "order".'},
                status=status.HTTP_400_BAD_REQUEST
            )

        reorder_education_timeline(order_data)
        return Response({'message': 'Education timeline reordered successfully.'}, status=status.HTTP_200_OK)