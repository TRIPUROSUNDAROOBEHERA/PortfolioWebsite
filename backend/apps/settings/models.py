from django.db import models
from django.core.exceptions import ValidationError


def logo_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    return f"settings/branding/site_logo.{ext}"


def favicon_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    return f"settings/branding/favicon.{ext}"


def og_image_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    return f"settings/seo/og_image.{ext}"


class SiteSetting(models.Model):
    """
    Global Site & CMS Settings (Singleton):
    - Branding & Logo (Initials 'AS', Site Name, Favicon)
    - Footer Details & Legal Links (Copyright, Privacy Policy, Terms & Conditions)
    - SEO & Social Graph (Meta Title, Description, Keywords, OG Image)
    - Feature Flags & Analytics (Maintenance Mode, Contact Form Active, Google Analytics)
    """

    # 1. Branding & Header UI
    site_name = models.CharField(
        max_length=100,
        default="Your Name Portfolio",
        help_text="Website name in browser title"
    )
    logo_initials = models.CharField(
        max_length=10,
        default="AS",
        help_text="Initials shown in the top-left circular badge"
    )
    logo_image = models.ImageField(
        upload_to=logo_upload_path,
        blank=True,
        null=True,
        help_text="Custom branding logo image"
    )
    favicon = models.ImageField(
        upload_to=favicon_upload_path,
        blank=True,
        null=True,
        help_text="Browser favicon (.ico or .png)"
    )

    # 2. SEO & Social Meta
    meta_title = models.CharField(
        max_length=150,
        default="Your Name | MCA Graduate & Software Developer",
        help_text="Default SEO title tag"
    )
    meta_description = models.TextField(
        default="Passionate MCA graduate and software developer portfolio showcasing full-stack projects, certificates, skills, and technical articles.",
        help_text="SEO description for search engines and link sharing"
    )
    meta_keywords = models.CharField(
        max_length=255,
        default="Software Developer, Full Stack, React, Django, Python, Portfolio, MCA",
        help_text="Comma-separated SEO keywords"
    )
    og_image = models.ImageField(
        upload_to=og_image_upload_path,
        blank=True,
        null=True,
        help_text="Social sharing card banner image"
    )

    # 3. Footer & Legal
    footer_copyright = models.CharField(
        max_length=150,
        default="© 2025 Your Name. All rights reserved.",
        help_text="Footer copyright string"
    )
    footer_credit = models.CharField(
        max_length=100,
        default="Made with ❤️ using React",
        help_text="Footer developer credit badge"
    )
    privacy_policy = models.TextField(
        blank=True,
        help_text="Full markdown or HTML content for /privacy-policy"
    )
    terms_conditions = models.TextField(
        blank=True,
        help_text="Full markdown or HTML content for /terms-and-conditions"
    )

    # 4. Feature Flags & Integrations
    enable_contact_form = models.BooleanField(
        default=True,
        help_text="Allow visitors to send messages through the contact form"
    )
    enable_public_resume_download = models.BooleanField(
        default=True,
        help_text="Show active 'Download CV' button on the navbar"
    )
    maintenance_mode = models.BooleanField(
        default=False,
        help_text="Display maintenance notice to visitors"
    )
    google_analytics_id = models.CharField(
        max_length=50,
        blank=True,
        help_text="Google Analytics Measurement ID (e.g., 'G-XXXXXXXXXX')"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site & SEO Setting"
        verbose_name_plural = "Site & SEO Settings"

    def __str__(self):
        return f"{self.site_name} Configuration"

    def clean(self):
        """Enforce Singleton: Only 1 site configuration instance can exist."""
        if not self.pk and SiteSetting.objects.exists():
            raise ValidationError("A Site Setting instance already exists. Edit the existing configuration.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)