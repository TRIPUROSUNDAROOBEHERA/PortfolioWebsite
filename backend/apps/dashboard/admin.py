from django.contrib import admin
from django.utils.html import format_html
from .models import PageView


@admin.register(PageView)
class PageViewAdmin(admin.ModelAdmin):
    # Columns shown in the analytics overview table
    list_display = (
        'path',
        'device_badge',
        'browser',
        'ip_address',
        'timestamp',
    )

    # Clickable field to open the full session audit log
    list_display_links = ('path',)

    # Sidebar Filter Controls
    list_filter = (
        'device_type',
        'browser',
        ('timestamp', admin.DateFieldListFilter),
    )

    # Search Bar (Top of table)
    search_fields = ('path', 'referrer', 'ip_address', 'browser')

    # Default Sorting & Pagination
    ordering = ('-timestamp',)
    date_hierarchy = 'timestamp'
    list_per_page = 25

    # Full read-only inspector layout
    readonly_fields = (
        'path',
        'ip_address',
        'user_agent',
        'device_type',
        'browser',
        'referrer',
        'timestamp',
    )

    fieldsets = (
        ('Request Details', {
            'fields': ('path', 'referrer', 'timestamp'),
        }),
        ('Client Analytics & Network', {
            'fields': ('device_type', 'browser', 'ip_address', 'user_agent'),
        }),
    )

    # Visual device tag badge (Desktop / Mobile / Tablet)
    @admin.display(description='Device', ordering='device_type')
    def device_badge(self, obj):
        device = (obj.device_type or 'Desktop').lower()
        if 'mobile' in device:
            bg_color, text_color = '#eff6ff', '#1d4ed8'
        elif 'tablet' in device:
            bg_color, text_color = '#fef3c7', '#b45309'
        else:
            bg_color, text_color = '#f1f5f9', '#475569'

        return format_html(
            '<span style="background-color:{}; color:{}; padding:4px 10px; border-radius:6px; font-weight:700; font-size:11px; text-transform:uppercase;">{}</span>',
            bg_color,
            text_color,
            obj.device_type or 'Unknown',
        )

    # Enforce Read-Only Analytics (No manual inserts, edits, or deletes)
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        # Allow superusers to clear old logs if needed, but block regular staff
        return request.user.is_superuser