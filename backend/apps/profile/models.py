import os
from django.db import models
from django.conf import settings
from django.core.exceptions import ValidationError


def profile_image_upload_path(instance, filename):
    """Generate dynamic upload path for profile avatar."""
    ext = filename.split('.')[-1]
    return f"profile/avatars/user_{instance.user_id if instance.user else 'admin'}.{ext}"


def resume_upload_path(instance, filename):
    """Generate dynamic upload path for resume/CV files."""
    return f"profile/resumes/{filename}"


class Profile(models.Model):
    """
    Core Profile Model mapped directly to:
    - TopBar: Email, Phone, Location, Availability Status, Social Links
    - Hero Section: Full Name, Role Badge, Title/Bio, CTA links, Quick Statistics
    - About Me Section: Bio paragraph, Read More content, Feature Image
    """
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
        help_text="Associated admin user account"
    )

    # --------------------------------------------------------------------------
    # 1. TopBar & Contact Header Info
    # --------------------------------------------------------------------------
    email = models.EmailField(
        default="example@gmail.com",
        help_text="Displayed in the top navigation bar"
    )
    phone = models.CharField(
        max_length=30,
        default="+91 98765 43210",
        help_text="Phone number with country code"
    )
    location = models.CharField(
        max_length=100,
        default="India",
        help_text="Current city or country (e.g., Vizianagaram, India)"
    )
    is_available = models.BooleanField(
        default=True,
        verbose_name="Available for Opportunities",
        help_text="Controls the green availability status badge in the TopBar"
    )

    # --------------------------------------------------------------------------
    # 2. Hero Section Identity & Headline
    # --------------------------------------------------------------------------
    first_name = models.CharField(max_length=50, default="Your")
    last_name = models.CharField(max_length=50, default="Name")
    badge_title = models.CharField(
        max_length=100,
        default="MCA Graduate",
        help_text="Small pill/badge below the profile photo"
    )
    badge_subtitle = models.CharField(
        max_length=100,
        default="Passionate Developer",
        help_text="Supporting badge text"
    )
    headline = models.CharField(
        max_length=255,
        default="MCA Graduate | Software Developer | Lifelong Learner",
        help_text="Sub-heading below the main greeting"
    )
    hero_description = models.TextField(
        default="Passionate about building web applications and exploring new technologies. Love to solve real-world problems and contribute to impactful solutions.",
        help_text="Short bio text displayed in the Hero banner"
    )

    # --------------------------------------------------------------------------
    # 3. About Me Section
    # --------------------------------------------------------------------------
    about_text = models.TextField(
        default="I am a motivated MCA graduate with a strong foundation in computer applications and a passion for software development. I enjoy building responsive, user-friendly web applications and solving real-world problems.",
        help_text="Main description rendered in the 'About Me' card"
    )
    about_detailed_text = models.TextField(
        blank=True,
        null=True,
        help_text="Extended biography displayed when clicking 'Read More'"
    )
    about_image = models.ImageField(
        upload_to="profile/about/",
        blank=True,
        null=True,
        help_text="Secondary coding/laptop workspace image in the About section"
    )

    # --------------------------------------------------------------------------
    # 4. Hero Quick Stats Row (Counter Section)
    # --------------------------------------------------------------------------
    years_of_learning = models.CharField(
        max_length=20,
        default="2+",
        help_text="e.g., 2+"
    )
    total_projects_count = models.CharField(
        max_length=20,
        default="10+",
        help_text="e.g., 10+"
    )
    total_certificates_count = models.CharField(
        max_length=20,
        default="25+",
        help_text="e.g., 25+"
    )
    courses_completed_count = models.CharField(
        max_length=20,
        default="5+",
        help_text="e.g., 5+"
    )
    hours_of_coding = models.CharField(
        max_length=20,
        default="1000+",
        help_text="e.g., 1000+"
    )

    # --------------------------------------------------------------------------
    # 5. Media & Assets
    # --------------------------------------------------------------------------
    avatar = models.ImageField(
        upload_to=profile_image_upload_path,
        blank=True,
        null=True,
        help_text="Main profile picture with glowing circular border"
    )
    resume = models.FileField(
        upload_to=resume_upload_path,
        blank=True,
        null=True,
        help_text="PDF for 'Download CV' button"
    )

    # --------------------------------------------------------------------------
    # 6. Social Network Profiles
    # --------------------------------------------------------------------------
    github_url = models.URLField(
        blank=True,
        default="https://github.com",
        help_text="GitHub profile URL"
    )
    linkedin_url = models.URLField(
        blank=True,
        default="https://linkedin.com",
        help_text="LinkedIn profile URL"
    )
    twitter_url = models.URLField(
        blank=True,
        default="https://twitter.com",
        help_text="Twitter / X profile URL"
    )
    instagram_url = models.URLField(
        blank=True,
        default="https://instagram.com",
        help_text="Instagram profile URL"
    )

    # --------------------------------------------------------------------------
    # 7. Metadata Timestamps
    # --------------------------------------------------------------------------
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Profile Information"
        verbose_name_plural = "Profile Information"
        ordering = ["-updated_at"]

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.badge_title})"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    def clean(self):
        """Ensure singleton pattern: Only one master Profile instance exists."""
        if not self.pk and Profile.objects.exists():
            raise ValidationError("A Profile instance already exists. Please edit the existing profile instead of creating a new one.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)