from rest_framework import serializers
from .models import Education


class EducationSerializer(serializers.ModelSerializer):
    """Full Education Serializer for Admin CMS & detailed views."""
    duration = serializers.ReadOnlyField()
    icon_display = serializers.CharField(source='get_icon_display', read_only=True)

    class Meta:
        model = Education
        fields = [
            'id',
            'degree',
            'field_of_study',
            'institution',
            'start_year',
            'end_year',
            'duration',
            'score_display',
            'icon',
            'icon_display',
            'order',
            'is_active',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class EducationTimelineSerializer(serializers.ModelSerializer):
    """Optimized serializer matching the Home page 'Education Timeline' horizontal cards."""
    duration = serializers.ReadOnlyField()

    class Meta:
        model = Education
        fields = [
            'id',
            'degree',
            'field_of_study',
            'institution',
            'duration',
            'score_display',
            'icon',
            'order',
        ]