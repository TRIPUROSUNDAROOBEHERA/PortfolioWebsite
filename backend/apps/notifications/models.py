from django.db import models
from django.conf import settings


class NotificationType(models.TextChoices):
    CONTACT_MESSAGE = 'contact', 'New Contact Message'
    SYSTEM_ALERT = 'system', 'System / Security Alert'
    LOGIN_ALERT = 'login', 'Admin Login Activity'
    MILESTONE = 'milestone', 'Goal / Milestone Achieved'


class NotificationLevel(models.TextChoices):
    INFO = 'info', 'Information'
    SUCCESS = 'success', 'Success'
    WARNING = 'warning', 'Warning'
    ERROR = 'error', 'Critical / Error'


class Notification(models.Model):
    """
    Notification Model for Admin Dashboard:
    - Real-time alerts for incoming contact inquiries
    - System health, security logins, and milestone updates
    - Read/Unread tracking with quick action links
    """
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notifications',
        null=True,
        blank=True,
        help_text="Target admin user (null sends to all staff)"
    )
    title = models.CharField(
        max_length=200,
        help_text="Notification heading (e.g., 'New message from Jane Doe')"
    )
    message = models.TextField(
        help_text="Notification details"
    )
    notification_type = models.CharField(
        max_length=30,
        choices=NotificationType.choices,
        default=NotificationType.CONTACT_MESSAGE
    )
    level = models.CharField(
        max_length=20,
        choices=NotificationLevel.choices,
        default=NotificationLevel.INFO
    )
    action_url = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        help_text="Dashboard deep-link (e.g., '/admin/messages/4')"
    )
    is_read = models.BooleanField(
        default=False,
        help_text="Read status toggle"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Admin Notification"
        verbose_name_plural = "Admin Notifications"
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.get_level_display()}] {self.title}"