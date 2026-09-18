from django.contrib import admin
from .models import BlogPost, BlogCategory


@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'category',
        'published_date',
        'reading_time',
        'views_count',
        'is_published',
        'is_featured',
    )
    list_filter = ('is_published', 'is_featured', 'category', 'published_date')
    search_fields = ('title', 'summary', 'content', 'tags')
    list_editable = ('is_published', 'is_featured')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('-published_date', '-created_at')
    date_hierarchy = 'published_date'

    fieldsets = (
        ('Article Details', {
            'fields': ('title', 'slug', 'category', 'summary', 'content')
        }),
        ('Media & Metadata', {
            'fields': ('cover_image', 'tags', 'reading_time', 'published_date')
        }),
        ('Visibility & Analytics', {
            'fields': ('is_published', 'is_featured', 'views_count')
        }),
    )
    readonly_fields = ('reading_time', 'views_count')