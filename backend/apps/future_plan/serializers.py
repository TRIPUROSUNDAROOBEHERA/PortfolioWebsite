from rest_framework import serializers
from .models import FuturePlan


class FuturePlanSerializer(serializers.ModelSerializer):
    """Full Serializer for Admin CMS management."""
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = FuturePlan
        fields = [
            'id',
            'title',
            'category',
            'category_display',
            'status',
            'status_display',
            'target_date',
            'description',
            'is_active',
            'order',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class FuturePlanSummarySerializer(serializers.ModelSerializer):
    """Optimized serializer for the Home page 'Upcoming / Future Plan' card."""

    class Meta:
        model = FuturePlan
        fields = [
            'id',
            'title',
            'category',
            'status',
            'order',
        ]