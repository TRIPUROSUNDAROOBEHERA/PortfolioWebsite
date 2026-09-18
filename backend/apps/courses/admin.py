from django.contrib import admin
from .models import Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'platform', 'completion_date', 'is_completed', 'is_featured', 'order')
    list_filter = ('platform', 'is_completed', 'is_featured')
    search_fields = ('title', 'platform', 'instructor')
    list_editable = ('is_completed', 'is_featured', 'order')
    ordering = ('order', '-created_at')

    fieldsets = (
        ('Course Details', {
            'fields': ('title', 'platform', 'instructor', 'completion_date')
        }),
        ('Links & Verification', {
            'fields': ('course_url', 'certificate_url')
        }),
        ('Visibility & Ordering', {
            'fields': ('is_completed', 'is_featured', 'order')
        }),
    )