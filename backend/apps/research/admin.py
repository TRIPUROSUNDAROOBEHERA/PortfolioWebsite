from django.contrib import admin
from .models import ResearchPaper


@admin.register(ResearchPaper)
class ResearchPaperAdmin(admin.ModelAdmin):
    list_display = ('title', 'field_of_study', 'status', 'authors', 'published_date', 'is_featured', 'order')
    list_filter = ('status', 'field_of_study', 'is_featured')
    search_fields = ('title', 'abstract', 'authors')
    list_editable = ('status', 'is_featured', 'order')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('order', '-created_at')

    fieldsets = (
        ('Research Identification', {
            'fields': ('title', 'slug', 'field_of_study', 'status', 'authors', 'published_date')
        }),
        ('Abstract & Content', {
            'fields': ('abstract', 'full_content')
        }),
        ('Publication & Links', {
            'fields': ('publication_venue', 'doi_or_url', 'paper_pdf', 'cover_image')
        }),
        ('Display & Ordering', {
            'fields': ('is_featured', 'order')
        }),
    )