from django.db import models


class FuturePlanCategory(models.TextChoices):
    COURSE = 'course', 'Course & Lesson'
    CERTIFICATION = 'certification', 'Certification'
    PROJECT = 'project', 'Project & Architecture'
    BLOG = 'blog', 'Blog & Knowledge Article'
    CAREER = 'career', 'Career & Skill Goal'


class FuturePlan(models.Model):
    """
    Model mapped directly to the "Upcoming / Future Plan" section:
    - Target Plan / Goal (e.g., 'Add New Courses & Lessons', 'Upload New Certificates', 'Build More Projects', 'Write More Blogs')
    - Category classification
    - Status (Pending, In Progress, Completed)
    - Display priority order & Home page visibility
    """

    class Status(models.TextChoices):
        PLANNED = 'planned', 'Planned'
        IN_PROGRESS = 'in_progress', 'In Progress'
        COMPLETED = 'completed', 'Completed'

    title = models.CharField(
        max_length=200,
        help_text="Goal / Milestone text (e.g., 'Add New Courses & Lessons', 'Upload New Certificates')"
    )
    category = models.CharField(
        max_length=30,
        choices=FuturePlanCategory.choices,
        default=FuturePlanCategory.PROJECT,
        help_text="Category of the future milestone"
    )
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PLANNED,
        help_text="Current execution status"
    )
    target_date = models.CharField(
        max_length=60,
        blank=True,
        help_text="Target completion timeline (e.g., 'Q3 2026', 'December 2026')"
    )
    description = models.TextField(
        blank=True,
        help_text="Optional detail / roadmap notes"
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Render in public portfolio widget"
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Display priority (0 appears first)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Future Plan Goal"
        verbose_name_plural = "Upcoming / Future Plans"
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.title} [{self.get_status_display()}]"