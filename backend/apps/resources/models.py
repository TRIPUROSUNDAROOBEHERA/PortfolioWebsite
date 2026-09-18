import os
from django.db import models


def resource_file_upload_path(instance, filename):
    clean_title = instance.title.lower().replace(" ", "_")
    ext = filename.split('.')[-1]
    return f"resources/{instance.resource_type}/{clean_title}.{ext}"


class ResourceType(models.TextChoices):
    NOTES = 'notes', 'Notes & PDFs'
    TUTORIAL = 'tutorial', 'Coding Tutorials'
    EBOOK = 'ebook', 'E-Books'
    LINK = 'link', 'Important Links'
    CHEATSHEET = 'cheatsheet', 'Cheat Sheets'


class Resource(models.Model):
    """
    Resource Model mapped directly to the "Resources" section in UI:
    - Notes & PDFs
    - Coding Tutorials
    - E-Books
    - Important Links
    """
    title = models.CharField(
        max_length=180,
        help_text="Title of the resource (e.g., 'Django REST Cheatsheet', 'DSA Complete Notes')"
    )
    resource_type = models.CharField(
        max_length=30,
        choices=ResourceType.choices,
        default=ResourceType.NOTES,
        help_text="Classification matching the UI resource categories"
    )
    description = models.TextField(
        blank=True,
        help_text="Short description of the resource"
    )
    file_attachment = models.FileField(
        upload_to=resource_file_upload_path,
        blank=True,
        null=True,
        help_text="Downloadable PDF, ZIP, or document file"
    )
    external_url = models.URLField(
        blank=True,
        null=True,
        help_text="External link (GitHub gist, Notion page, or article URL)"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Visibility toggle on public portfolio"
    )
    download_count = models.PositiveIntegerField(
        default=0,
        help_text="Counter for public downloads"
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Sorting rank (0 appears first)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Resource"
        verbose_name_plural = "Resources & Materials"
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.title} ({self.get_resource_type_display()})"