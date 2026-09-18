from rest_framework import serializers
from .models import ResearchPaper


class ResearchPaperSerializer(serializers.ModelSerializer):
    """Full Serializer for Research details & Admin CMS."""
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    pdf_url = serializers.SerializerMethodField()

    class Meta:
        model = ResearchPaper
        fields = [
            'id',
            'title',
            'slug',
            'field_of_study',
            'abstract',
            'full_content',
            'status',
            'status_display',
            'authors',
            'publication_venue',
            'doi_or_url',
            'paper_pdf',
            'pdf_url',
            'cover_image',
            'published_date',
            'is_featured',
            'order',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']

    def get_pdf_url(self, obj):
        request = self.context.get('request')
        if obj.paper_pdf:
            return request.build_absolute_uri(obj.paper_pdf.url) if request else obj.paper_pdf.url
        return None


class ResearchPaperSummarySerializer(serializers.ModelSerializer):
    """Lightweight serializer for summary cards."""
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = ResearchPaper
        fields = [
            'id',
            'title',
            'slug',
            'field_of_study',
            'abstract',
            'status',
            'status_display',
            'authors',
            'publication_venue',
            'doi_or_url',
            'cover_image',
            'published_date',
            'order',
        ]