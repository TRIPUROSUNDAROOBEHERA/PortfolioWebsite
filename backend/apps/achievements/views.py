from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Achievement
from .serializers import AchievementSerializer, AchievementSummarySerializer
from .permissions import IsAdminOrReadOnly
from .services import get_featured_achievements, reorder_achievements


class AchievementViewSet(viewsets.ModelViewSet):
    """
    API ViewSet for Achievements:
    - GET    /api/achievements/          -> List all achievements
    - POST   /api/achievements/          -> Create new achievement (Admin only)
    - GET    /api/achievements/<id>/     -> View single achievement details
    - PUT    /api/achievements/<id>/     -> Update achievement (Admin only)
    - PATCH  /api/achievements/<id>/     -> Partial update achievement (Admin only)
    - DELETE /api/achievements/<id>/     -> Delete achievement (Admin only)
    - GET    /api/achievements/featured/ -> Featured list for Home UI
    - POST   /api/achievements/reorder/  -> Update sequence ordering (Admin only)
    """
    queryset = Achievement.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['icon_style', 'is_featured']
    search_fields = ['title', 'description', 'organization']
    ordering_fields = ['order', 'created_at', 'title']
    ordering = ['order', '-created_at']

    def get_serializer_class(self):
        if self.action in ['list', 'featured']:
            return AchievementSummarySerializer
        return AchievementSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return Achievement.objects.all()
        return Achievement.objects.filter(is_featured=True)

    @action(detail=False, methods=['get'], url_path='featured')
    def featured(self, request):
        achievements = get_featured_achievements(limit=5)
        serializer = AchievementSummarySerializer(achievements, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='reorder', permission_classes=[IsAdminOrReadOnly])
    def reorder(self, request):
        order_data = request.data.get('orders', [])
        if not isinstance(order_data, list):
            return Response(
                {'error': 'Expected a list of objects with "id" and "order".'},
                status=status.HTTP_400_BAD_REQUEST
            )
        reorder_achievements(order_data)
        return Response({'message': 'Achievements reordered successfully.'}, status=status.HTTP_200_OK)