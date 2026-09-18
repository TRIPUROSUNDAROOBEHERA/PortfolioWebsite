from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone


class Education(models.Model):
    """
    Education Timeline Model mapped directly to the Education Timeline section:
    - Degree Title (e.g., 'MCA', 'B.Sc (Science)', '12th (Intermediate)')
    - Field of Study (e.g., 'Master of Computer Applications', 'Science')
    - Institution / University (e.g., 'University Name', 'College Name')
    - Start Year & End Year (e.g., 2021 – 2023)
    - Score Display (e.g., 'CGPA: 8.7 / 10', 'Percentage: 78.20%')
    - Node Icon styling and Timeline sequencing
    """

    class IconChoice(models.TextChoices):
        GRADUATION_CAP = 'graduation-cap', 'Graduation Cap (Postgraduate/Degree)'
        FLASK = 'flask', 'Science Flask (B.Sc / Science)'
        BOOK = 'book', 'Open Book (Intermediate / 12th)'
        SCHOOL = 'school', 'School / Matriculation'
        AWARD = 'award', 'Academic Honor'

    degree = models.CharField(
        max_length=120,
        help_text="Short qualification title (e.g., 'MCA', 'B.Sc (Science)')"
    )
    field_of_study = models.CharField(
        max_length=200,
        help_text="Specialization or stream (e.g., 'Master of Computer Applications', 'Science')"
    )
    institution = models.CharField(
        max_length=255,
        help_text="College or University name"
    )
    start_year = models.PositiveIntegerField(
        default=2020,
        validators=[MinValueValidator(1990), MaxValueValidator(2099)],
        help_text="Starting academic year (e.g., 2021)"
    )
    end_year = models.PositiveIntegerField(
        default=2024,
        validators=[MinValueValidator(1990), MaxValueValidator(2099)],
        help_text="Passing/completion year (e.g., 2023)"
    )
    score_display = models.CharField(
        max_length=100,
        blank=True,
        default="",
        help_text="Score string (e.g., 'CGPA: 8.7 / 10', 'Percentage: 78.20%')"
    )
    icon = models.CharField(
        max_length=40,
        choices=IconChoice.choices,
        default=IconChoice.GRADUATION_CAP,
        help_text="Icon rendered inside the timeline node"
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Timeline rank from left to right (0 = leftmost/first)"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Toggle visibility on the public portfolio"
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Education Record"
        verbose_name_plural = "Education Timeline"
        ordering = ['order', '-end_year']

    def __str__(self):
        return f"{self.degree} - {self.institution} ({self.start_year} - {self.end_year})"

    @property
    def duration(self):
        """Format duration string: e.g., '2021 – 2023'"""
        return f"{self.start_year} – {self.end_year}"