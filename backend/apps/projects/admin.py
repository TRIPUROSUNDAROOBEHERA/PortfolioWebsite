from django.contrib import admin
from django.utils.html import format_html
from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    # ─── 1. List View Display & Quick Actions ─────────────────────
    list_display = (
        'thumbnail_preview',
        'title',
        'category',
        'get_tech_display',
        'is_featured',
        'order',
        'created_at',
    )
    list_display_links = ('title',)
    list_editable = ('is_featured', 'order')
    list_filter = ('category', 'is_featured', 'created_at')
    search_fields = (
        'title',
        'description',
        'detailed_description',
        'technologies',
    )
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('order', '-created_at')
    readonly_fields = ('created_at', 'updated_at', 'thumbnail_preview_large')

    # ─── 2. Form Fieldsets Layout ─────────────────────────────────
    fieldsets = (
        ('Basic Information', {
            'fields': (
                'title',
                'slug',
                'category',
                'description',
                'technologies',
            )
        }),
        ('Detailed Writeup', {
            'fields': ('detailed_description',),
            'classes': ('collapse',),
        }),
        ('Links & Media Assets', {
            'fields': (
                'thumbnail',
                'thumbnail_preview_large',
                'live_url',
                'github_url',
            )
        }),
        ('Display & Ordering Settings', {
            'fields': (
                'is_featured',
                'order',
            )
        }),
        ('Metadata', {
            'classes': ('collapse',),
            'fields': ('created_at', 'updated_at'),
        }),
    )

    # ─── 3. Safe Technologies / Tech Stack Helper ────────────────
    @admin.display(description='Technologies')
    def get_tech_display(self, obj):
        if hasattr(obj, 'technologies') and obj.technologies:
            return obj.technologies
        if hasattr(obj, 'tech_stack') and obj.tech_stack:
            return obj.tech_stack
        return "—"

    # ─── 4. Table Row Thumbnail Preview ──────────────────────────
    @admin.display(description='Thumbnail')
    def thumbnail_preview(self, obj):
        if hasattr(obj, 'thumbnail') and obj.thumbnail:
            return format_html(
                '<img src="{}" style="width: 48px; height: 32px; object-fit: cover; border-radius: 6px; border: 1px solid #cbd5e1;" />',
                obj.thumbnail.url
            )
        return "No image"

    # ─── 5. Form Large Image Preview ─────────────────────────────
    @admin.display(description='Current Thumbnail Preview')
    def thumbnail_preview_large(self, obj):
        if hasattr(obj, 'thumbnail') and obj.thumbnail:
            return format_html(
                '<img src="{}" style="max-width: 240px; max-height: 140px; object-fit: cover; border-radius: 12px; border: 2px solid #e2e8f0;" />',
                obj.thumbnail.url
            )
        return "No image uploaded yet"