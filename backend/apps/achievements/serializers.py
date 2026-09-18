from rest_framework import serializers
from .models import Achievement


class AchievementSerializer(serializers.ModelSerializer):
    """Full Serializer for Admin CMS management."""
    icon_style_display = serializers.CharField(source='get_icon_style_display', read_only=True)
    custom_icon_url = serializers.SerializerMethodField()

    class Meta:
        model = Achievement
        fields = [
            'id',
            'title',
            'description',
            'organization',
            'icon_style',
            'icon_style_display',
            'custom_icon',
            'custom_icon_url',
            'certificate_link',
            'is_featured',
            'order',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_custom_icon_url(self, obj):
        request = self.context.get('request')
        if obj.custom_icon:
            return request.build_absolute_uri(obj.custom_icon.url) if request else obj.custom_icon.url
        return None


class AchievementSummarySerializer(serializers.ModelSerializer):
    """Optimized serializer matching the Home page Achievements list card."""
    custom_icon_url = serializers.SerializerMethodField()

    class Meta:
        model = Achievement
        fields = [
            'id',
            'title',
            'description',
            'organization',
            'icon_style',
            'custom_icon_url',
            'certificate_link',
            'order',
        ]

    def get_custom_icon_url(self, obj):
        request = self.context.get('request')
        if obj.custom_icon:
            return request.build_absolute_uri(obj.custom_icon.url) if request else obj.custom_icon.url
        return None