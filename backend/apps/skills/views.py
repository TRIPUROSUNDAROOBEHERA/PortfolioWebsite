from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Skill, SkillCategory
from .serializers import SkillSerializer, SkillSummarySerializer
from .permissions import IsAdminOrReadOnly
from .services import get_grouped_skills, reorder_skills


class SkillViewSet(viewsets.ModelViewSet):
    """
    API ViewSet for Skills & Technologies:
    - GET    /api/skills/          -> List all skills
    - POST   /api/skills/          -> Create a skill (Admin only)
    - GET    /api/skills/<id>/     -> View single skill detail
    - PUT    /api/skills/<id>/     -> Update skill (Admin only)
    - PATCH  /api/skills/<id>/     -> Partial update skill (Admin only)
    - DELETE /api/skills/<id>/     -> Delete skill (Admin only)
    - GET    /api/skills/featured/ -> Flat list of featured skills for Home UI
    - GET    /api/skills/grouped/  -> Grouped by Frontend/Backend/Database/Tools
    - POST   /api/skills/reorder/  -> Update skill ordering sequence (Admin only)
    """
    queryset = Skill.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['category', 'is_featured']
    search_fields = ['name', 'category']
    ordering_fields = ['order', 'name', 'proficiency_percentage']
    ordering = ['order', 'name']

    def get_serializer_class(self):
        if self.action in ['list', 'featured']:
            return SkillSummarySerializer
        return SkillSerializer

    @action(detail=False, methods=['get'], url_path='featured')
    def featured(self, request):
        featured_skills = Skill.objects.filter(is_featured=True).order_by('order', 'name')
        serializer = SkillSummarySerializer(featured_skills, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='grouped')
    def grouped(self, request):
        grouped_data = get_grouped_skills()
        result = {}
        for category_key, skills_list in grouped_data.items():
            result[category_key] = SkillSummarySerializer(
                skills_list,
                many=True,
                context={'request': request}
            ).data
        return Response(result, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='reorder', permission_classes=[IsAdminOrReadOnly])
    def reorder(self, request):
        order_data = request.data.get('orders', [])
        if not isinstance(order_data, list):
            return Response(
                {'error': 'Expected a list of objects with "id" and "order".'},
                status=status.HTTP_400_BAD_REQUEST
            )
        reorder_skills(order_data)
        return Response({'message': 'Skills reordered successfully.'}, status=status.HTTP_200_OK)