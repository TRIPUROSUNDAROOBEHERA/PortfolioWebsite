from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Course
from .serializers import CourseSerializer, CourseSummarySerializer
from .permissions import IsAdminOrReadOnly
from .services import get_featured_courses, reorder_courses


class CourseViewSet(viewsets.ModelViewSet):
    """
    API ViewSet for Courses:
    - GET    /api/courses/          -> List all courses (supports filter & search)
    - POST   /api/courses/          -> Create new course (Admin only)
    - GET    /api/courses/<id>/     -> View single course details
    - PUT    /api/courses/<id>/     -> Update course (Admin only)
    - PATCH  /api/courses/<id>/     -> Partial update course (Admin only)
    - DELETE /api/courses/<id>/     -> Delete course (Admin only)
    - GET    /api/courses/featured/ -> 4 featured courses for Home page card
    - POST   /api/courses/reorder/  -> Update course ordering (Admin only)
    """
    queryset = Course.objects.all()
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['platform', 'is_completed', 'is_featured']
    search_fields = ['title', 'platform', 'instructor']
    ordering_fields = ['order', 'created_at', 'title']
    ordering = ['order', '-created_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return CourseSummarySerializer
        return CourseSerializer

    @action(detail=False, methods=['get'], url_path='featured')
    def featured(self, request):
        courses = get_featured_courses(limit=6)
        serializer = CourseSummarySerializer(courses, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='reorder', permission_classes=[IsAdminOrReadOnly])
    def reorder(self, request):
        order_data = request.data.get('orders', [])
        if not isinstance(order_data, list):
            return Response({'error': 'Expected a list of {"id": int, "order": int}'}, status=status.HTTP_400_BAD_REQUEST)
        
        reorder_courses(order_data)
        return Response({'message': 'Courses reordered successfully.'}, status=status.HTTP_200_OK)