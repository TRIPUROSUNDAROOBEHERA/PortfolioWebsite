from rest_framework import serializers
from .models import Skill


class SkillSerializer(serializers.ModelSerializer):
    """Full Skill Serializer for Admin CMS management."""
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    icon_url = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = [
            'id',
            'name',
            'category',
            'category_display',
            'icon_name',
            'icon_image',
            'icon_url',
            'proficiency_percentage',
            'is_featured',
            'order',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_icon_url(self, obj):
        request = self.context.get('request')
        if obj.icon_image:
            return request.build_absolute_uri(obj.icon_image.url) if request else obj.icon_image.url
        return None


class SkillSummarySerializer(serializers.ModelSerializer):
    """Optimized serializer matching the Home page Skills & Technologies grid pills."""
    icon_url = serializers.SerializerMethodField()

    class Meta:
        model = Skill
        fields = [
            'id',
            'name',
            'category',
            'icon_name',
            'icon_url',
            'order',
        ]

    def get_icon_url(self, obj):
        request = self.context.get('request')
        if obj.icon_image:
            return request.build_absolute_uri(obj.icon_image.url) if request else obj.icon_image.url
        return None