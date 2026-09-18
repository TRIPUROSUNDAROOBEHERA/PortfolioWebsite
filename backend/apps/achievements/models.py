from django.db import models


def achievement_icon_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    safe_title = instance.title.lower().replace(" ", "_")[:30]
    return f"achievements/icons/{safe_title}.{ext}"


class Achievement(models.Model):
    """
    Achievement Model mapped directly to the UI Achievements Card & Trophy showcase:
    - College Topper - MCA (2023) [Awarded for academic excellence]
    - Hackathon Winner [Smart India Hackathon 2023]
    - 1000+ DSA Problems Solved [LeetCode & GeeksforGeeks]
    """

    class IconStyle(models.TextChoices):
        MEDAL = 'medal', 'Academic Medal (College Topper / Academic)'
        TROPHY = 'trophy', 'Trophy (Hackathon Winner / Competition)'
        STAR = 'star', 'Star Badge (Problem Solving / Milestone)'
        CODE = 'code', 'Coding / Tech Award'

    title = models.CharField(
        max_length=180,
        help_text="Achievement headline (e.g., 'College Topper - MCA (2023)', 'Hackathon Winner')"
    )
    description = models.CharField(
        max_length=255,
        help_text="Supporting detail (e.g., 'Awarded for academic excellence', 'Smart India Hackathon 2023')"
    )
    organization = models.CharField(
        max_length=150,
        blank=True,
        help_text="Issuing body / contest platform (e.g., 'LeetCode & GeeksforGeeks')"
    )
    icon_style = models.CharField(
        max_length=30,
        choices=IconStyle.choices,
        default=IconStyle.TROPHY,
        help_text="Icon badge rendered to the left of the item"
    )
    custom_icon = models.FileField(
        upload_to=achievement_icon_upload_path,
        blank=True,
        null=True,
        help_text="Custom SVG/PNG upload if preset icon is not used"
    )
    certificate_link = models.URLField(
        blank=True,
        null=True,
        help_text="Direct link to proof / certificate / competition leaderboard"
    )
    is_featured = models.BooleanField(
        default=True,
        help_text="Showcase on the home page achievements card"
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Sequence rank (0 appears first)"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Achievement"
        verbose_name_plural = "Achievements"
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title