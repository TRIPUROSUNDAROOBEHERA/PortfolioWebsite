from rest_framework import serializers
from .models import BlogPost, BlogCategory


class BlogCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug', 'description']


class BlogPostListSerializer(serializers.ModelSerializer):
    """Optimized serializer for home page widgets and blog cards."""
    category_name = serializers.CharField(source='category.name', read_only=True)
    formatted_date = serializers.ReadOnlyField()
    tag_list = serializers.ReadOnlyField()

    class Meta:
        model = BlogPost
        fields = [
            'id',
            'title',
            'slug',
            'category_name',
            'summary',
            'cover_image',
            'tag_list',
            'reading_time',
            'views_count',
            'is_featured',
            'published_date',
            'formatted_date',
        ]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    """Full serializer for single blog view with content markdown/HTML."""
    category = BlogCategorySerializer(read_only=True)
    formatted_date = serializers.ReadOnlyField()
    tag_list = serializers.ReadOnlyField()

    class Meta:
        model = BlogPost
        fields = [
            'id',
            'title',
            'slug',
            'category',
            'summary',
            'content',
            'cover_image',
            'tags',
            'tag_list',
            'reading_time',
            'views_count',
            'is_published',
            'is_featured',
            'published_date',
            'formatted_date',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'slug', 'reading_time', 'views_count', 'created_at', 'updated_at']


class BlogPostAdminCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for Admin CMS creation and updates."""
    class Meta:
        model = BlogPost
        fields = '__all__'
        read_only_fields = ['id', 'slug', 'reading_time', 'views_count', 'created_at', 'updated_at']