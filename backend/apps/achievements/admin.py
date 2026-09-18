from django.contrib import admin
from .models import Achievement


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'organization', 'icon_style', 'is_featured', 'order')
    list_filter = ('icon_style', 'is_featured')
    search_fields = ('title', 'description', 'organization')
    list_editable = ('icon_style', 'is_featured', 'order')
    ordering = ('order', '-created_at')

    fieldsets = (
        ('Achievement Title & Detail', {
            'fields': ('title', 'description', 'organization')
        }),
        ('Icon & Links', {
            'fields': ('icon_style', 'custom_icon', 'certificate_link')
        }),
        ('Display & Ordering', {
            'fields': ('is_featured', 'order')
        }),
    )