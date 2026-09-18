import os
from django.db import models
from django.conf import settings
from .validators import validate_file_size, validate_file_extension


def dynamic_media_upload_path(instance, filename):
    folder = instance.folder_category or 'general'
    return f"uploads/{folder}/{filename}"


class MediaFolderCategory(models.TextChoices):
    AVATARS = 'avatars', 'Profile & Avatars'
    PROJECTS = 'projects', 'Project Screenshots'
    CERTIFICATES = 'certificates', 'Certificates & Credentials'
    ACHIEVEMENTS = 'achievements', 'Achievements & Badges'
    BLOGS = 'blogs', 'Blog Covers & Content'
    DOCUMENTS = 'documents', 'Documents & Resumes'
    ICONS = 'icons', 'Skill & Tech Icons'
    GENERAL = 'general', 'General Assets'


class MediaAsset(models.Model):
    """
    Centralized Media Asset Library:
    - Stores images, PDFs, icons, documents for CMS reuse
    - Tracks file metadata, dimensions, file size, and upload sources
    """
    title = models.CharField(
        max_length=200,
        help_text="Descriptive asset title"
    )
    file = models.FileField(
        upload_to=dynamic_media_upload_path,
        validators=[validate_file_size, validate_file_extension],
        help_text="Uploaded media file (Max 10MB)"
    )
    folder_category = models.CharField(
        max_length=40,
        choices=MediaFolderCategory.choices,
        default=MediaFolderCategory.GENERAL,
        help_text="Target folder partition"
    )
    file_type = models.CharField(
        max_length=50,
        blank=True,
        help_text="MIME type or detected extension"
    )
    file_size_bytes = models.PositiveIntegerField(
        default=0,
        help_text="File size in bytes"
    )
    alt_text = models.CharField(
        max_length=255,
        blank=True,
        help_text="Accessibility alt text for images"
    )
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='uploaded_assets'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Media Asset"
        verbose_name_plural = "Media Library Assets"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.get_folder_category_display()})"

    def save(self, *args, **kwargs):
        if self.file:
            self.file_size_bytes = self.file.size
            ext = os.path.splitext(self.file.name)[1].lower()
            self.file_type = ext.replace('.', '').upper()
        super().save(*args, **kwargs)

    @property
    def file_size_display(self):
        """Format size for display (e.g., '1.42 MB' or '350 KB')."""
        if self.file_size_bytes < 1024 * 1024:
            return f"{round(self.file_size_bytes / 1024, 1)} KB"
        return f"{round(self.file_size_bytes / (1024 * 1024), 2)} MB"