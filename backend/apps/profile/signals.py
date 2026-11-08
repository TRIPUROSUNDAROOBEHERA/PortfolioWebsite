from django.apps import apps
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver


def sync_profile_metrics():
    try:
        Profile = apps.get_model('profile', 'Profile')
        Project = apps.get_model('projects', 'Project')
        Certificate = apps.get_model('certificates', 'Certificate')
        if not Profile or not Project or not Certificate:
            return

        profile = Profile.objects.first()
        if not profile:
            return
        p_count = Project.objects.count()
        c_count = Certificate.objects.count()
        profile.total_projects_count = f"{max(p_count, 10)}+"
        profile.total_certificates_count = f"{max(c_count, 25)}+"
        profile.save(update_fields=['total_projects_count', 'total_certificates_count', 'updated_at'])
    except Exception:
        pass


@receiver([post_save, post_delete], sender='projects.Project')
def on_project_changed(sender, **kwargs):
    sync_profile_metrics()


@receiver([post_save, post_delete], sender='certificates.Certificate')
def on_certificate_changed(sender, **kwargs):
    sync_profile_metrics()


@receiver([post_save, post_delete], sender='skills.Skill')
def on_skill_changed(sender, **kwargs):
    sync_profile_metrics()
