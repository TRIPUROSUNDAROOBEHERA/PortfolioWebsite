from django.contrib import admin
from .models import Publication


@admin.register(Publication)
class PublicationAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'publication_type',
        'journal_or_conference',
        'published_date',
        'citation_count',
        'is_featured',
        'order',
    )
    list_filter = ('publication_type', 'is_featured', 'published_date')
    search_fields = ('title', 'authors', 'journal_or_conference', 'abstract', 'doi')
    list_editable = ('is_featured', 'order')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('order', '-published_date')

    fieldsets = (
        ('Publication Info', {
            'fields': ('title', 'slug', 'publication_type', 'authors', 'journal_or_conference', 'volume_issue', 'published_date')
        }),
        ('Abstract & Content', {
            'fields': ('abstract',)
        }),
        ('Verification, Links & Files', {
            'fields': ('doi', 'doi_url', 'pdf_file', 'cover_image', 'citation_count')
        }),
        ('Display & Ordering', {
            'fields': ('is_featured', 'order')
        }),
    )