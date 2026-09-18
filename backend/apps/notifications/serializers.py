from rest_framework import serializers
from .models import Notification


class NotificationSerializer(serializers.ModelSerializer):
    """Serializer for Admin Notification Bell Dropdown & Dashboard widget."""
    type_display = serializers.CharField(source='get_notification_type_display', read_only=True)
    level_display = serializers.CharField(source='get_level_display', read_only=True)
    formatted_time = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = [
            'id',
            'title',
            'message',
            'notification_type',
            'type_display',
            'level',
            'level_display',
            'action_url',
            'is_read',
            'created_at',
            'formatted_time',
        ]
        read_only_fields = ['id', 'title', 'message', 'notification_type', 'level', 'action_url', 'created_at']

    def get_formatted_time(self, obj):
        return obj.created_at.strftime('%b %d, %Y %I:%M %p')