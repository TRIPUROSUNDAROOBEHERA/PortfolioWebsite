from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import FuturePlan
from .serializers import FuturePlanSerializer, FuturePlanSummarySerializer
from .permissions import IsAdminOrReadOnly
from .services import get_active_plans, reorder_future_plans


class FuturePlanViewSet(viewsets.ModelViewSet):
    """
    API ViewSet for Future Plans:
    - GET    /api/future-plan/          -> List all plans (Admin sees all, Public sees active)
    - POST   /api/future-plan/          -> Create new plan milestone (Admin only)
    - GET    /api/future-plan/<id>/     -> View plan detail
    - PUT    /api/future-plan/<id>/     -> Update plan (Admin only)
    - PATCH  /api/future-plan/<id>/     -> Partial update plan (Admin only)
    - DELETE /api/future-plan/<id>/     -> Delete plan (Admin only)
    - GET    /api/future-plan/active/   -> Active roadmap items for Home page
    - POST   /api/future-plan/reorder/  -> Reorder items (Admin only)
    """
    queryset = FuturePlan.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'status', 'is_active']
    search_fields = ['title', 'description', 'target_date']
    ordering_fields = ['order', 'created_at']
    ordering = ['order', '-created_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return FuturePlanSummarySerializer
        return FuturePlanSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return FuturePlan.objects.all()
        return FuturePlan.objects.filter(is_active=True)

    @action(detail=False, methods=['get'], url_path='active')
    def active(self, request):
        plans = get_active_plans()
        serializer = FuturePlanSummarySerializer(plans, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='reorder', permission_classes=[IsAdminOrReadOnly])
    def reorder(self, request):
        order_data = request.data.get('orders', [])
        if not isinstance(order_data, list):
            return Response(
                {'error': 'Expected a list of objects with "id" and "order".'},
                status=status.HTTP_400_BAD_REQUEST
            )
        reorder_future_plans(order_data)
        return Response({'message': 'Future plans reordered successfully.'}, status=status.HTTP_200_OK)