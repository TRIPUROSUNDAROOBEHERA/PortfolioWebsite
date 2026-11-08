from django.apps import AppConfig


class ProfileConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.profile'
    verbose_name = 'Profile & Bio Management'

    def ready(self):
        try:
            import apps.profile.signals  # noqa
        except ImportError:
            pass