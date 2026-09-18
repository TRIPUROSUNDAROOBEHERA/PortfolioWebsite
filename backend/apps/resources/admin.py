from django.contrib import admin
from .models import Resource


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'resource_type', 'download_count', 'order', 'is_active', 'created_at')
    list_filter = ('resource_type', 'is_active')
    search_fields = ('title', 'description')
    list_editable = ('order', 'is_active')
    readonly_fields = ('download_count', 'created_at', 'updated_at')
    ordering = ('order', '-created_at')

    fieldsets = (
        ('Resource Information', {
            'fields': ('title', 'resource_type', 'description')
        }),
        ('Attachment / Link', {
            'fields': ('file_attachment', 'external_url')
        }),
        ('Display & Statistics', {
            'fields': ('order', 'is_active', 'download_count')
        }),
    )