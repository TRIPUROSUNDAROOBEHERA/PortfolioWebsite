from django.db import models
from django.conf import settings


class ActionType(models.TextChoices):
    CREATE = 'CREATE', 'Created Record'
    UPDATE = 'UPDATE', 'Updated Record'
    DELETE = 'DELETE', 'Deleted Record'
    LOGIN = 'LOGIN', 'Admin Login'
    LOGOUT = 'LOGOUT', 'Admin Logout'
    SETTINGS_CHANGE = 'SETTINGS', 'Settings Modified'
    MEDIA_UPLOAD = 'MEDIA', 'Media File Uploaded'


class AuditLog(models.Model):
    """
    Audit Log Model for Admin Dashboard:
    - Tracks administrative actions (creation, editing, deletions)
    - Records user identity, IP address, user agent, module, and timestamp
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='audit_logs',
        help_text="Admin user who performed the action"
    )
    user_email = models.EmailField(
        blank=True,
        help_text="Snapshot of user email in case account is deleted"
    )
    action = models.CharField(
        max_length=30,
        choices=ActionType.choices,
        default=ActionType.UPDATE
    )
    module = models.CharField(
        max_length=80,
        help_text="Affected section/module (e.g., 'Projects', 'Skills', 'Settings', 'Profile')"
    )
    description = models.TextField(
        help_text="Human-readable description of the operation performed"
    )
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        help_text="Client IP address"
    )
    user_agent = models.TextField(
        blank=True,
        null=True,
        help_text="Browser/client user-agent header"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        db_index=True
    )

    class Meta:
        verbose_name = "Audit Log"
        verbose_name_plural = "Audit Logs"
        ordering = ['-created_at']

    def __str__(self):
        return f"[{self.created_at.strftime('%Y-%m-%d %H:%M')}] {self.user_email or 'System'} - {self.action} on {self.module}"

    def save(self, *args, **kwargs):
        if self.user and not self.user_email:
            self.user_email = self.user.email
        super().save(*args, **kwargs)