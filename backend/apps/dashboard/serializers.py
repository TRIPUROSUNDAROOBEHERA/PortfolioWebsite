from rest_framework import serializers
from .models import PageView


class PageViewTrackSerializer(serializers.ModelSerializer):
    """Public serializer for incoming frontend view telemetry."""
    class Meta:
        model = PageView
        fields = ['path', 'referrer']


class DashboardOverviewSerializer(serializers.Serializer):
    """Complete metrics mapping for all Admin CMS tiles."""
    projects = serializers.DictField()
    education = serializers.DictField()
    certificates = serializers.DictField()
    courses = serializers.DictField()
    achievements = serializers.DictField()
    blogs = serializers.DictField()
    skills = serializers.DictField()
    future_plans = serializers.DictField()
    research = serializers.DictField()
    publications = serializers.DictField()
    messages = serializers.DictField()
    resources = serializers.DictField()
    media = serializers.DictField()
    audit_logs = serializers.DictField()
    notifications = serializers.DictField()


class AnalyticsPayloadSerializer(serializers.Serializer):
    """Analytics time series and visitor breakdown serializer."""
    period_days = serializers.IntegerField()
    total_views = serializers.IntegerField()
    daily_traffic = serializers.ListField()
    device_distribution = serializers.ListField()
    top_pages = serializers.ListField()