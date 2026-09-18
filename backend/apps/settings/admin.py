from django.contrib import admin
from django.db import DatabaseError, OperationalError
from .models import SiteSetting


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    # ... your fieldsets / list_display configuration ...

    def has_add_permission(self, request):
        try:
            # Singleton pattern: Only allow 1 instance if a record already exists
            return not SiteSetting.objects.exists()
        except (DatabaseError, OperationalError):
            return True