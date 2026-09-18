from django.contrib import admin
from django.contrib.admin.models import LogEntry
from .models import AuditLog

@admin.register(LogEntry)
class LogEntryAdmin(admin.ModelAdmin):
    """
    Exposes Django's built-in action log history in the admin panel.
    """
    list_display = ('action_time', 'user', 'content_type', 'object_repr', 'action_flag')
    list_filter = ('action_flag', 'content_type', 'action_time')
    search_fields = ('object_repr', 'change_message', 'user__username')
    date_hierarchy = 'action_time'

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ('user', 'action', 'ip_address', 'get_created_time')
    list_filter = ('action',)
    search_fields = ('user__username', 'ip_address')

    @admin.display(description='Date / Time')
    def get_created_time(self, obj):
        # Gracefully handles created_at, timestamp, or action_time
        return getattr(obj, 'created_at', getattr(obj, 'timestamp', getattr(obj, 'action_time', '-')))