from django.contrib import admin
from .models import Education


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'field_of_study', 'institution', 'duration', 'score_display', 'icon', 'order', 'is_active')
    list_filter = ('is_active', 'icon', 'end_year')
    search_fields = ('degree', 'field_of_study', 'institution')
    list_editable = ('order', 'is_active', 'score_display')
    ordering = ('order', '-end_year')

    fieldsets = (
        ('Academic Details', {
            'fields': ('degree', 'field_of_study', 'institution')
        }),
        ('Timeline & Scores', {
            'fields': ('start_year', 'end_year', 'score_display')
        }),
        ('UI Presentation', {
            'fields': ('icon', 'order', 'is_active')
        }),
    )