import os
from django.db import models


def skill_icon_upload_path(instance, filename):
    clean_name = instance.name.lower().replace(" ", "_").replace(".", "_")
    ext = filename.split('.')[-1]
    return f"skills/icons/{clean_name}.{ext}"


class SkillCategory(models.TextChoices):
    FRONTEND = 'frontend', 'Frontend Development'
    BACKEND = 'backend', 'Backend Development'
    DATABASE = 'database', 'Databases & Storage'
    TOOLS = 'tools', 'Tools & Platforms'
    LANGUAGES = 'languages', 'Programming Languages'


class Skill(models.Model):
    """
    Skill model mapped directly to the Skills & Technologies grid:
    - HTML5, CSS3, JavaScript, React.js
    - Node.js, Python, Java, MySQL
    - MongoDB, Git & GitHub, Bootstrap, Tailwind CSS
    - VS Code, PostgreSQL, REST API, Figma
    """
    name = models.CharField(
        max_length=80,
        unique=True,
        help_text="Skill name (e.g., 'React.js', 'Python', 'Tailwind CSS')"
    )
    category = models.CharField(
        max_length=30,
        choices=SkillCategory.choices,
        default=SkillCategory.FRONTEND,
        help_text="Skill category classification"
    )
    icon_name = models.CharField(
        max_length=80,
        blank=True,
        help_text="Frontend icon key (e.g., 'SiHtml5', 'FaPython', 'SiPostgresql', 'SiTailwindcss')"
    )
    icon_image = models.FileField(
        upload_to=skill_icon_upload_path,
        blank=True,
        null=True,
        help_text="Custom SVG/PNG upload if frontend icon pack is not used"
    )
    proficiency_percentage = models.PositiveSmallIntegerField(
        default=85,
        help_text="Proficiency rating (0 to 100)"
    )
    is_featured = models.BooleanField(
        default=True,
        help_text="Display on the main home page skills grid"
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Sorting rank within the skills section"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Skill & Technology"
        verbose_name_plural = "Skills & Technologies"
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"