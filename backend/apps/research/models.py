from django.db import models
from django.utils.text import slugify


def research_file_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    safe_slug = slugify(instance.title) if instance.title else 'paper'
    return f"research/papers/{safe_slug}.{ext}"


def research_cover_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    safe_slug = slugify(instance.title) if instance.title else 'paper'
    return f"research/covers/{safe_slug}.{ext}"


class ResearchStatus(models.TextChoices):
    ONGOING = 'ongoing', 'Ongoing Research'
    COMPLETED = 'completed', 'Completed'
    PUBLISHED = 'published', 'Published'
    UNDER_REVIEW = 'under_review', 'Under Peer Review'


class ResearchPaper(models.Model):
    """
    Research & Technical Case Studies Model:
    - Title & Abstract / Summary
    - Domain / Topic (e.g., Artificial Intelligence, Distributed Systems, Web Performance)
    - Full Methodology & Findings / Content
    - Downloadable PDF Paper & Live / DOI Link
    - Co-authors / Mentors & Date
    """
    title = models.CharField(
        max_length=255,
        unique=True,
        help_text="Research title or technical paper headline"
    )
    slug = models.SlugField(
        max_length=280,
        unique=True,
        blank=True
    )
    field_of_study = models.CharField(
        max_length=150,
        help_text="Primary technical domain (e.g., 'Artificial Intelligence', 'Full-Stack Architecture')"
    )
    abstract = models.TextField(
        help_text="Executive summary / abstract of the research"
    )
    full_content = models.TextField(
        blank=True,
        null=True,
        help_text="Complete markdown/HTML research body if viewed as an online article"
    )
    status = models.CharField(
        max_length=30,
        choices=ResearchStatus.choices,
        default=ResearchStatus.COMPLETED
    )
    authors = models.CharField(
        max_length=255,
        default="Author Name",
        help_text="Authors or contributors list"
    )
    publication_venue = models.CharField(
        max_length=200,
        blank=True,
        help_text="Conference, journal, or university repository"
    )
    doi_or_url = models.URLField(
        blank=True,
        null=True,
        help_text="External link to DOI, arXiv, IEEE, or repository"
    )
    paper_pdf = models.FileField(
        upload_to=research_file_upload_path,
        blank=True,
        null=True,
        help_text="Downloadable full research paper PDF"
    )
    cover_image = models.ImageField(
        upload_to=research_cover_upload_path,
        blank=True,
        null=True,
        help_text="Preview graphic or diagram cover"
    )
    published_date = models.DateField(
        blank=True,
        null=True,
        help_text="Date of publication or completion"
    )
    is_featured = models.BooleanField(
        default=True,
        help_text="Display on portfolio highlights"
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display sorting priority"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Research Paper"
        verbose_name_plural = "Research & Studies"
        ordering = ['order', '-published_date', '-created_at']

    def __str__(self):
        return f"{self.title} ({self.get_status_display()})"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)