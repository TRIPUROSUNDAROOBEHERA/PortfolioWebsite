from django.db import models
from django.utils.text import slugify


def publication_pdf_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    safe_slug = slugify(instance.title) if instance.title else 'publication'
    return f"publications/papers/{safe_slug}.{ext}"


def publication_cover_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    safe_slug = slugify(instance.title) if instance.title else 'publication'
    return f"publications/covers/{safe_slug}.{ext}"


class PublicationType(models.TextChoices):
    JOURNAL = 'journal', 'Journal Article'
    CONFERENCE = 'conference', 'Conference Proceeding'
    BOOK_CHAPTER = 'book_chapter', 'Book Chapter'
    WHITE_PAPER = 'white_paper', 'Technical White Paper'


class Publication(models.Model):
    """
    Publications Model:
    - Title & Abstract
    - Authors / Co-authors list
    - Journal / Conference venue
    - Publisher / Volume / Issue details
    - DOI link, external citation link, and downloadable full PDF
    - Featured toggle & display ordering
    """
    title = models.CharField(
        max_length=255,
        unique=True,
        help_text="Full publication title"
    )
    slug = models.SlugField(
        max_length=280,
        unique=True,
        blank=True
    )
    publication_type = models.CharField(
        max_length=30,
        choices=PublicationType.choices,
        default=PublicationType.CONFERENCE,
        help_text="Type of publication"
    )
    authors = models.CharField(
        max_length=255,
        default="Your Name",
        help_text="Authors string (e.g., 'Your Name, Co-Author 1, Co-Author 2')"
    )
    journal_or_conference = models.CharField(
        max_length=255,
        help_text="Name of Journal, Conference, or Publisher"
    )
    volume_issue = models.CharField(
        max_length=100,
        blank=True,
        help_text="Volume, Issue, or Page range (e.g., 'Vol. 12, Issue 3, pp. 45-52')"
    )
    abstract = models.TextField(
        help_text="Executive summary / abstract of the paper"
    )
    doi = models.CharField(
        max_length=150,
        blank=True,
        help_text="Digital Object Identifier (e.g., '10.1109/ACCESS.2024.1234567')"
    )
    doi_url = models.URLField(
        blank=True,
        null=True,
        help_text="Direct link to IEEE, Springer, ACM, or DOI resolver"
    )
    pdf_file = models.FileField(
        upload_to=publication_pdf_upload_path,
        blank=True,
        null=True,
        help_text="Downloadable full-text PDF document"
    )
    cover_image = models.ImageField(
        upload_to=publication_cover_upload_path,
        blank=True,
        null=True,
        help_text="Preview graphic or cover snippet"
    )
    published_date = models.DateField(
        help_text="Official publication date"
    )
    citation_count = models.PositiveIntegerField(
        default=0,
        help_text="Number of citations / reads"
    )
    is_featured = models.BooleanField(
        default=True,
        help_text="Highlight on main portfolio views"
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display priority sequence"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Publication"
        verbose_name_plural = "Publications"
        ordering = ['order', '-published_date', '-created_at']

    def __str__(self):
        return f"{self.title} ({self.journal_or_conference})"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    @property
    def formatted_date(self):
        return self.published_date.strftime('%B %Y') if self.published_date else ''