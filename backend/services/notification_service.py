import logging
from django.apps import apps
from django.contrib.auth import get_user_model

logger = logging.getLogger('apps')
User = get_user_model()


class NotificationService:
    """Central service for creating and routing in-app notifications and alerts."""

    @staticmethod
    def _get_notification_model():
        try:
            return apps.get_model('notifications', 'Notification')
        except LookupError:
            return None

    @classmethod
    def create_alert(cls, title, message, notification_type='system', level='info', action_url=None, recipient=None):
        """
        Creates an in-app notification entry for admin dashboards.
        """
        Notification = cls._get_notification_model()
        if not Notification:
            logger.warning("Notification app model not installed/registered.")
            return None

        try:
            return Notification.objects.create(
                recipient=recipient,
                title=title,
                message=message,
                notification_type=notification_type,
                level=level,
                action_url=action_url,
            )
        except Exception as e:
            logger.error(f"Error creating notification: {str(e)}", exc_info=True)
            return None

    @classmethod
    def notify_contact_submission(cls, contact_message):
        """Dispatches an in-app alert when a contact form is submitted."""
        title = f"New Contact Message from {contact_message.name}"
        message = contact_message.message[:120] + ("..." if len(contact_message.message) > 120 else "")
        action_url = f"/admin/contact/contactmessage/{contact_message.id}/change/"

        return cls.create_alert(
            title=title,
            message=message,
            notification_type='contact',
            level='info',
            action_url=action_url
        )