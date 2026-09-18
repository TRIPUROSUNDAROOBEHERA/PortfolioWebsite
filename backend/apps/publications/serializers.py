from rest_framework import serializers
from .models import Publication


class PublicationSerializer(serializers.ModelSerializer):
    """Full Serializer for Publication details and Admin CMS management."""
    type_display = serializers.CharField(source='get_publication_type_display', read_only=True)
    formatted_date = serializers.ReadOnlyField()
    pdf_url = serializers.SerializerMethodField()

    class Meta:
        model = Publication
        fields = [
            'id',
            'title',
            'slug',
            'publication_type',
            'type_display',
            'authors',
            'journal_or_conference',
            'volume_issue',
            'abstract',
            'doi',
            'doi_url',
            'pdf_file',
            'pdf_url',
            'cover_image',
            'published_date',
            'formatted_date',
            'citation_count',
            'is_featured',
            'order',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']

    def get_pdf_url(self, obj):
        request = self.context.get('request')
        if obj.pdf_file:
            return request.build_absolute_uri(obj.pdf_file.url) if request else obj.pdf_file.url
        return None


class PublicationSummarySerializer(serializers.ModelSerializer):
    """Optimized serializer for list and grid cards."""
    type_display = serializers.CharField(source='get_publication_type_display', read_only=True)
    formatted_date = serializers.ReadOnlyField()

    class Meta:
        model = Publication
        fields = [
            'id',
            'title',
            'slug',
            'type_display',
            'authors',
            'journal_or_conference',
            'doi_url',
            'published_date',
            'formatted_date',
            'citation_count',
            'order',
        ]