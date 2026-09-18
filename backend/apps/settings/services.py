from .models import SiteSetting


def get_or_create_site_settings():
    """Retrieve global site settings or initialize default settings record."""
    settings_obj = SiteSetting.objects.first()
    if not settings_obj:
        settings_obj = SiteSetting.objects.create(
            site_name="Your Name Portfolio",
            logo_initials="AS",
            meta_title="Your Name | MCA Graduate & Software Developer",
            footer_copyright="© 2025 Your Name. All rights reserved.",
            footer_credit="Made with ❤️ using React",
            enable_contact_form=True,
            enable_public_resume_download=True,
            maintenance_mode=False
        )
    return settings_obj