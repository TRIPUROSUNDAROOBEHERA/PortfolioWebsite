from rest_framework import serializers
from .models import MediaAsset


class MediaAssetSerializer(serializers.ModelSerializer):
    """Full Media Asset Serializer for the Admin CMS Media Manager."""
    file_url = serializers.SerializerMethodField()
    category_display = serializers.CharField(source='get_folder_category_display', read_only=True)
    size_display = serializers.CharField(source='file_size_display', read_only=True)
    uploader_name = serializers.CharField(source='uploaded_by.email', read_only=True)

    class Meta:
        model = MediaAsset
        fields = [
            'id',
            'title',
            'file',
            'file_url',
            'folder_category',
            'category_display',
            'file_type',
            'file_size_bytes',
            'size_display',
            'alt_text',
            'uploader_name',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'file_type', 'file_size_bytes', 'created_at', 'updated_at']

    def get_file_url(self, obj):
        request = self.context.get('request')
        if obj.file:
            return request.build_absolute_uri(obj.file.url) if request else obj.file.url
        return None