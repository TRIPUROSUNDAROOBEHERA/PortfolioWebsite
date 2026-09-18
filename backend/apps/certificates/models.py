from django.db import models
from django.utils import timezone
from django.utils.text import slugify


def certificate_file_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    safe_name = slugify(instance.title) if instance.title else 'certificate'
    return f"certificates/documents/{safe_name}.{ext}"


def certificate_thumbnail_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    safe_name = slugify(instance.title) if instance.title else 'certificate'
    return f"certificates/previews/{safe_name}.{ext}"


class Certificate(models.Model):
    """
    Certificate Model mapped directly to the UI Certificates section:
    - Title & Issuing Authority
    - Formatted Issue Date String
    - Credential ID & Verification URL
    - Thumbnail Badge & Downloadable File Attachment
    - Display Ordering & Visibility Controls
    """
    title = models.CharField(
        max_length=180,
        help_text="Certificate name (e.g., 'React - Complete Guide', 'JavaScript Algorithms')"
    )
    issuer = models.CharField(
        max_length=120,
        help_text="Issuing authority / platform (e.g., 'Udemy', 'freeCodeCamp', 'Coursera')"
    )
    issue_date = models.CharField(
        max_length=60,
        blank=True,
        default="",
        help_text="Formatted date string (e.g., 'June 2024', 'May 2024')"
    )
    credential_id = models.CharField(
        max_length=150,
        blank=True,
        default="",
        help_text="License or credential ID"
    )
    credential_url = models.URLField(
        blank=True,
        default="",
        help_text="Verification link to external platform"
    )
    thumbnail = models.ImageField(
        upload_to=certificate_thumbnail_upload_path,
        blank=True,
        null=True,
        help_text="Preview badge shown on the left of each item"
    )
    certificate_file = models.FileField(
        upload_to=certificate_file_upload_path,
        blank=True,
        null=True,
        help_text="Downloadable PDF/image triggered by the download icon"
    )
    is_featured = models.BooleanField(
        default=True,
        help_text="Display on the Home page certificates card"
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Sequence order (0 appears first)"
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Certificate"
        verbose_name_plural = "Certificates"
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.title} ({self.issuer} - {self.issue_date})"

    @property
    def subtitle(self):
        """Format 'Issuer | Month Year' matching the card layout."""
        if self.issue_date:
            return f"{self.issuer} | {self.issue_date}"
        return self.issuer