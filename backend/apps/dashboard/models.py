from django.db import models


class PageView(models.Model):
    """
    Visitor & Page View Tracking Model:
    - Tracks portfolio traffic, routes, device types, and referrers
    - Feeds data into the Admin Panel Dashboard Analytics charts
    """
    path = models.CharField(
        max_length=255,
        default="/",
        help_text="Visited URL path (e.g., '/', '/projects', '/blog')"
    )
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        help_text="Anonymized or hashed visitor IP"
    )
    user_agent = models.TextField(
        blank=True,
        null=True,
        help_text="Client browser user agent"
    )
    device_type = models.CharField(
        max_length=50,
        default="Desktop",
        help_text="Desktop / Mobile / Tablet"
    )
    browser = models.CharField(
        max_length=60,
        blank=True,
        help_text="Detected browser name (Chrome, Firefox, Safari, Edge)"
    )
    referrer = models.URLField(
        blank=True,
        null=True,
        help_text="Inbound traffic source URL"
    )
    timestamp = models.DateTimeField(
        auto_now_add=True,
        db_index=True
    )

    class Meta:
        verbose_name = "Page View"
        verbose_name_plural = "Page Views"
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.path} ({self.device_type}) - {self.timestamp.strftime('%Y-%m-%d %H:%M')}"