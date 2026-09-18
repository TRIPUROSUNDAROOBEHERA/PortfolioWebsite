from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import BlogPost, BlogCategory
from .serializers import (
    BlogPostListSerializer,
    BlogPostDetailSerializer,
    BlogPostAdminCreateUpdateSerializer,
    BlogCategorySerializer,
)
from .filters import BlogPostFilter
from .services import increment_blog_views, get_latest_posts, get_featured_posts
from apps.accounts.permissions import IsAdminOrReadOnly


class BlogCategoryViewSet(viewsets.ModelViewSet):
    """CRUD ViewSet for Blog Categories."""
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'slug'


class BlogPostViewSet(viewsets.ModelViewSet):
    """
    Blog Posts API ViewSet:
    - GET  /api/blogs/            -> List published blogs (filterable & searchable)
    - POST /api/blogs/            -> Create new post (Admin only)
    - GET  /api/blogs/<slug>/     -> Get full post content and increment views
    - PUT/PATCH /api/blogs/<slug>/-> Update post (Admin only)
    - DELETE /api/blogs/<slug>/   -> Delete post (Admin only)
    - GET  /api/blogs/latest/     -> 3 most recent posts for Home row 4
    - GET  /api/blogs/featured/   -> Featured posts for Home Blog card
    """
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    lookup_field = 'slug'

    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = BlogPostFilter
    search_fields = ['title', 'summary', 'content', 'tags']
    ordering_fields = ['published_date', 'views_count', 'reading_time', 'title']
    ordering = ['-published_date', '-created_at']

    def get_queryset(self):
        # Admin users can see drafts; public visitors only see published posts
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return BlogPost.objects.all().select_related('category')
        return BlogPost.objects.filter(is_published=True).select_related('category')

    def get_serializer_class(self):
        if self.action == 'list':
            return BlogPostListSerializer
        elif self.action in ['create', 'update', 'partial_update']:
            return BlogPostAdminCreateUpdateSerializer
        return BlogPostDetailSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        # Increment view count on single post fetch
        increment_blog_views(instance.id)
        instance.refresh_from_db(fields=['views_count'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='latest')
    def latest(self, request):
        latest_posts = get_latest_posts(limit=3)
        serializer = BlogPostListSerializer(latest_posts, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], url_path='featured')
    def featured(self, request):
        featured_posts = get_featured_posts(limit=3)
        serializer = BlogPostListSerializer(featured_posts, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)