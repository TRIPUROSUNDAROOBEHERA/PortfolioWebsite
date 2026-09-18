import math
from django.db import models
from django.utils.text import slugify
from django.utils import timezone


def blog_image_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    safe_slug = slugify(instance.title) if instance.title else 'blog'
    return f"blogs/covers/{safe_slug}.{ext}"


class BlogCategory(models.Model):
    """Category grouping for blog posts (e.g., Web Development, Career, Tutorials)."""
    name = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    description = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        verbose_name = "Blog Category"
        verbose_name_plural = "Blog Categories"
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class BlogPost(models.Model):
    """
    Blog Post Model mapped to:
    - Blog / Knowledge Section
    - Latest Blog Posts Widget
    - Detailed Blog Reading View
    """
    title = models.CharField(
        max_length=200,
        unique=True,
        help_text="Blog title (e.g., 'Future of AI in Education', 'React Best Practices')"
    )
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    category = models.ForeignKey(
        BlogCategory,
        on_delete=models.SET_NULL,
        related_name='posts',
        null=True,
        blank=True
    )
    summary = models.TextField(
        max_length=400,
        help_text="Short excerpt displayed on cards and search results"
    )
    content = models.TextField(
        help_text="Full blog post content (Markdown or HTML format)"
    )
    cover_image = models.ImageField(
        upload_to=blog_image_upload_path,
        blank=True,
        null=True,
        help_text="Thumbnail image for blog card preview"
    )
    tags = models.CharField(
        max_length=255,
        blank=True,
        help_text="Comma-separated tags (e.g., 'React, JavaScript, WebDev')"
    )
    reading_time = models.PositiveIntegerField(
        default=5,
        help_text="Estimated reading time in minutes"
    )
    views_count = models.PositiveIntegerField(
        default=0,
        help_text="Total page views count"
    )
    is_published = models.BooleanField(
        default=True,
        help_text="Publish status toggle"
    )
    is_featured = models.BooleanField(
        default=False,
        help_text="Pin to the main Home 'Blog / Knowledge' showcase"
    )
    published_date = models.DateField(
        default=timezone.now,
        help_text="Displayed publish date (e.g., 'May 12, 2024')"
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Blog Post"
        verbose_name_plural = "Blog Posts"
        ordering = ['-published_date', '-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)

        # Automatically calculate reading time if content is present (approx. 200 words per minute)
        if self.content:
            word_count = len(self.content.split())
            self.reading_time = max(1, math.ceil(word_count / 200))

        super().save(*args, **kwargs)

    @property
    def formatted_date(self):
        """Format date to 'May 12, 2024' format."""
        return self.published_date.strftime('%B %d, %Y') if self.published_date else ''

    @property
    def tag_list(self):
        """Return list of tags for frontend badges."""
        if not self.tags:
            return []
        return [t.strip() for t in self.tags.split(',') if t.strip()]