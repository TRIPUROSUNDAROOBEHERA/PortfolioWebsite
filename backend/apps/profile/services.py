from .models import Profile


def get_or_create_default_profile():
    """Retrieve the primary profile or create default record if empty."""
    profile = Profile.objects.first()
    if not profile:
        profile = Profile.objects.create(
            first_name="Your",
            last_name="Name",
            badge_title="MCA Graduate",
            badge_subtitle="Passionate Developer",
            headline="MCA Graduate | Software Developer | Lifelong Learner",
            email="example@gmail.com",
            phone="+91 98765 43210",
            location="India",
            is_available=True,
            years_of_learning="2+",
            total_projects="10+",
            total_certificates="25+",
            courses_completed="5+",
            hours_of_coding="1000+"
        )
    return profile