from rest_framework import serializers
from .models import Resource


class ResourceSerializer(serializers.ModelSerializer):
    """Full Resource Serializer for Admin CMS & downloads."""
    type_display = serializers.CharField(source='get_resource_type_display', read_only=True)
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = Resource
        fields = [
            'id',
            'title',
            'resource_type',
            'type_display',
            'description',
            'file_attachment',
            'download_url',
            'external_url',
            'download_count',
            'is_active',
            'order',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'download_count', 'created_at', 'updated_at']

    def get_download_url(self, obj):
        request = self.context.get('request')
        if obj.file_attachment:
            return request.build_absolute_uri(obj.file_attachment.url) if request else obj.file_attachment.url
        return obj.external_url


class ResourceSummarySerializer(serializers.ModelSerializer):
    """Optimized serializer matching the Home page 'Resources' card."""
    type_display = serializers.CharField(source='get_resource_type_display', read_only=True)

    class Meta:
        model = Resource
        fields = [
            'id',
            'title',
            'resource_type',
            'type_display',
            'external_url',
            'order',
        ]