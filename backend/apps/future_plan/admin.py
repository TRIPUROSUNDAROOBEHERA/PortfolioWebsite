from django.contrib import admin
from .models import FuturePlan


@admin.register(FuturePlan)
class FuturePlanAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'status', 'target_date', 'order', 'is_active')
    list_filter = ('category', 'status', 'is_active')
    search_fields = ('title', 'description', 'target_date')
    list_editable = ('status', 'order', 'is_active')
    ordering = ('order', '-created_at')

    fieldsets = (
        ('Milestone Target', {
            'fields': ('title', 'category', 'status', 'target_date')
        }),
        ('Detailed Overview', {
            'fields': ('description',)
        }),
        ('Display & Ordering', {
            'fields': ('order', 'is_active')
        }),
    )