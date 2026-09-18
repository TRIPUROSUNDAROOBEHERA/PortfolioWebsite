from rest_framework import serializers
from .models import AuditLog


class AuditLogSerializer(serializers.ModelSerializer):
    """Serializer for Admin CMS Audit Logs table view."""
    action_display = serializers.CharField(source='get_action_display', read_only=True)
    formatted_time = serializers.SerializerMethodField()

    class Meta:
        model = AuditLog
        fields = [
            'id',
            'user_email',
            'action',
            'action_display',
            'module',
            'description',
            'ip_address',
            'user_agent',
            'created_at',
            'formatted_time',
        ]
        read_only_fields = fields

    def get_formatted_time(self, obj):
        return obj.created_at.strftime('%b %d, %Y %I:%M %p')