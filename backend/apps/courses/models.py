from django.db import models


class CoursePlatform(models.TextChoices):
    COURSERA = 'Coursera', 'Coursera'
    UDEMY = 'Udemy', 'Udemy'
    NPTEL = 'NPTEL', 'NPTEL'
    EDX = 'edX', 'edX'
    FREECODECAMP = 'freeCodeCamp', 'freeCodeCamp'
    OTHER = 'Other', 'Other Platform'


class Course(models.Model):
    """
    Course Model mapped directly to the "Courses Completed" section:
    - Course Title (e.g., Data Structures & Algorithms, Web Development Bootcamp)
    - Platform / Issuer (e.g., Coursera, Udemy, NPTEL)
    - Instructor / Organization name
    - Completion Status & Date
    - Course URL & Verification Certificate Link
    - Order & Featured Display Toggles
    """
    title = models.CharField(
        max_length=180,
        help_text="Course title (e.g., 'Data Structures & Algorithms', 'Web Development Bootcamp')"
    )
    platform = models.CharField(
        max_length=50,
        default=CoursePlatform.UDEMY,
        help_text="Platform or institute offering the course (e.g., 'Coursera', 'Udemy', 'NPTEL')"
    )
    instructor = models.CharField(
        max_length=120,
        blank=True,
        help_text="Course instructor or teaching institution"
    )
    completion_date = models.CharField(
        max_length=50,
        blank=True,
        help_text="Month and Year of completion (e.g., 'May 2024', 'Dec 2023')"
    )
    course_url = models.URLField(
        blank=True,
        null=True,
        help_text="Link to the course curriculum or overview page"
    )
    certificate_url = models.URLField(
        blank=True,
        null=True,
        help_text="Direct link to verified course completion certificate"
    )
    is_completed = models.BooleanField(
        default=True,
        help_text="Displays the green checkmark badge in the UI"
    )
    is_featured = models.BooleanField(
        default=True,
        help_text="Showcase inside the main Home page courses list"
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display priority (0 appears first)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Completed Course"
        verbose_name_plural = "Courses Completed"
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.title} ({self.platform})"