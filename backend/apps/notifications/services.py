from django.contrib.auth import get_user_model
from .models import Notification, NotificationType, NotificationLevel

User = get_user_model()


def create_notification(title, message, notification_type=NotificationType.SYSTEM_ALERT, level=NotificationLevel.INFO, action_url=None, recipient=None):
    """Helper utility to generate admin alerts across different apps."""
    return Notification.objects.create(
        recipient=recipient,
        title=title,
        message=message,
        notification_type=notification_type,
        level=level,
        action_url=action_url,
    )


def mark_all_notifications_as_read(user=None):
    """Mark all active notifications as read."""
    queryset = Notification.objects.filter(is_read=False)
    if user and not user.is_superuser:
        queryset = queryset.filter(recipient=user)
    return queryset.update(is_read=True)