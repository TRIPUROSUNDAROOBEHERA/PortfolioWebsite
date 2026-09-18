from rest_framework import serializers
from .models import Certificate


class CertificateSerializer(serializers.ModelSerializer):
    """Full Serializer for Admin CMS management and verification views."""
    subtitle = serializers.ReadOnlyField()
    thumbnail_url = serializers.SerializerMethodField()
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = Certificate
        fields = [
            'id',
            'title',
            'issuer',
            'issue_date',
            'subtitle',
            'credential_id',
            'credential_url',
            'thumbnail',
            'thumbnail_url',
            'certificate_file',
            'download_url',
            'is_featured',
            'order',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_thumbnail_url(self, obj):
        request = self.context.get('request')
        if obj.thumbnail:
            return request.build_absolute_uri(obj.thumbnail.url) if request else obj.thumbnail.url
        return None

    def get_download_url(self, obj):
        request = self.context.get('request')
        if obj.certificate_file:
            return request.build_absolute_uri(obj.certificate_file.url) if request else obj.certificate_file.url
        return obj.credential_url


class CertificateSummarySerializer(serializers.ModelSerializer):
    """Optimized serializer matching the Home page 'Certificates' card."""
    subtitle = serializers.ReadOnlyField()
    thumbnail_url = serializers.SerializerMethodField()
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = Certificate
        fields = [
            'id',
            'title',
            'issuer',
            'issue_date',
            'subtitle',
            'thumbnail_url',
            'download_url',
            'credential_url',
            'order',
        ]

    def get_thumbnail_url(self, obj):
        request = self.context.get('request')
        if obj.thumbnail:
            return request.build_absolute_uri(obj.thumbnail.url) if request else obj.thumbnail.url
        return None

    def get_download_url(self, obj):
        request = self.context.get('request')
        if obj.certificate_file:
            return request.build_absolute_uri(obj.certificate_file.url) if request else obj.certificate_file.url
        return obj.credential_url