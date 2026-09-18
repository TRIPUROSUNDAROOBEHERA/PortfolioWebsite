from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    """Full Project Serializer with parsed tech stack array."""
    tech_list = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'slug',
            'category',
            'description',
            'detailed_description',
            'technologies',
            'tech_list',
            'thumbnail',
            'live_url',
            'github_url',
            'is_featured',
            'order',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']


class ProjectSummarySerializer(serializers.ModelSerializer):
    """Lightweight serializer optimized for Home Page 4-column cards."""
    tech_list = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'slug',
            'category',
            'description',
            'tech_list',
            'thumbnail',
            'live_url',
            'github_url',
            'is_featured',
            'order',
        ]