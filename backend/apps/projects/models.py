from django.db import models
from django.utils import timezone
from django.utils.text import slugify


def project_thumbnail_path(instance, filename):
    """Dynamic upload path for project card preview screenshots."""
    ext = filename.split('.')[-1]
    safe_slug = slugify(instance.title) if instance.title else 'project'
    return f"projects/thumbnails/{safe_slug}.{ext}"


class ProjectCategory(models.TextChoices):
    FULL_STACK = 'full_stack', 'Full Stack'
    FRONTEND = 'frontend', 'Frontend'
    BACKEND = 'backend', 'Backend / API'
    MOBILE = 'mobile', 'Mobile App'
    SYSTEMS = 'systems', 'Systems / Cloud'


class Project(models.Model):
    """
    Project model mapped directly to the UI Projects Card Grid:
    - Title & Unique Slug
    - Category (Full Stack, Frontend, Backend, etc.)
    - Description (Short card summary) & Detailed Description (Full Case Study)
    - Technologies (Comma-separated list e.g., 'React, Tailwind CSS, Vite')
    - Thumbnail (Preview screenshot inside laptop frame)
    - Live URL & GitHub URL
    - Featured toggle & Display order
    """
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    category = models.CharField(
        max_length=30,
        choices=ProjectCategory.choices,
        default=ProjectCategory.FULL_STACK
    )
    description = models.TextField(
        blank=True,
        default="",
        help_text="Card summary displayed on the main home grid"
    )
    detailed_description = models.TextField(
        blank=True,
        default="",
        help_text="Complete case study / write-up for project details page"
    )
    technologies = models.CharField(
        max_length=255,
        blank=True,
        default="",
        help_text="Comma-separated tech tags (e.g., 'React, Tailwind CSS, Vite')"
    )
    thumbnail = models.ImageField(
        upload_to=project_thumbnail_path,
        blank=True,
        null=True,
        help_text="Screenshot or banner image for card preview"
    )
    live_url = models.URLField(
        blank=True,
        default="",
        help_text="Deployed application link"
    )
    github_url = models.URLField(
        blank=True,
        default="",
        help_text="Source code repository link"
    )
    is_featured = models.BooleanField(
        default=True,
        help_text="Showcase on Home page grid"
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Sort order rank (0 = first)"
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    @property
    def tech_list(self):
        """Splits comma-separated string into a clean list of tags."""
        if not self.technologies:
            return []
        return [t.strip() for t in self.technologies.split(',') if t.strip()]