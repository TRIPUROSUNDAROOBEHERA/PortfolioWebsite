from rest_framework import serializers
from .models import ContactMessage


class ContactMessageCreateSerializer(serializers.ModelSerializer):
    """
    Public serializer for submitting the 'Let's Connect' quick form.
    Allows 'subject' to be optional while validating name and message content.
    """
    subject = serializers.CharField(
        required=False,
        allow_blank=True,
        default="Portfolio Inquiry",
        max_length=200,
    )

    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message']
        extra_kwargs = {
            'name': {'required': True},
            'email': {'required': True},
            'message': {'required': True},
        }

    def validate_name(self, value):
        cleaned = value.strip()
        if len(cleaned) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        return cleaned

    def validate_subject(self, value):
        if not value or not value.strip():
            return "Portfolio Inquiry"
        return value.strip()

    def validate_message(self, value):
        cleaned = value.strip()
        if len(cleaned) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long.")
        return cleaned


class ContactMessageAdminSerializer(serializers.ModelSerializer):
    """
    Complete serializer for the Admin CMS Messages Inbox.
    """

    class Meta:
        model = ContactMessage
        fields = [
            'id',
            'name',
            'email',
            'subject',
            'message',
            'is_read',
            'is_archived',
            'ip_address',
            'created_at',
            'updated_at',
        ]
        read_only_fields = [
            'id',
            'name',
            'email',
            'subject',
            'message',
            'ip_address',
            'created_at',
            'updated_at',
        ]