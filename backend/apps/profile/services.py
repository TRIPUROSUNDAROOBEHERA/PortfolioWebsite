from django.contrib.auth import get_user_model
from .models import Profile


def get_or_create_default_profile():
    """Retrieve the primary profile or create default record if empty."""
    profile = Profile.objects.first()
    if not profile:
        User = get_user_model()
        user = User.objects.filter(is_superuser=True).first() or User.objects.first()
        if not user:
            user = User.objects.create_superuser(
                email="admin@portfolio.local",
                password="adminpassword123",
                first_name="Admin",
                last_name="User"
            )
        profile = Profile.objects.create(
            user=user,
            first_name="Your",
            last_name="Name",
            badge_title="MCA Graduate",
            badge_subtitle="Passionate Developer",
            headline="MCA Graduate | Software Developer | Lifelong Learner",
            email=user.email or "example@gmail.com",
            phone="+91 98765 43210",
            location="India",
            github_url="https://github.com/TRIPUROSUNDAROOBEHERA",
            is_available=True,
            years_of_learning="2+",
            total_projects_count="10+",
            total_certificates_count="25+",
            courses_completed_count="5+",
            hours_of_coding="1000+"
        )
    return profile