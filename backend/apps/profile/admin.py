from django.contrib import admin
from django.utils.html import format_html
from .models import Profile


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    # ─── 1. List View Display & Actions ──────────────────────────
    list_display = (
        'get_display_name',
        'badge_title',
        'email',
        'phone',
        'location',
        'is_available',
        'updated_at',
    )
    list_display_links = ('get_display_name',)
    list_editable = ('is_available',)
    list_filter = ('is_available', 'location')
    search_fields = (
        'first_name',
        'last_name',
        'email',
        'badge_title',
        'location',
    )
    readonly_fields = ('created_at', 'updated_at', 'avatar_preview')

    # ─── 2. Organized Layout Sections ────────────────────────────
    fieldsets = (
        ('Header & TopBar Info', {
            'fields': ('email', 'phone', 'location', 'is_available')
        }),
        ('Hero Identity & Headline', {
            'fields': (
                'first_name',
                'last_name',
                'badge_title',
                'badge_subtitle',
                'headline',
                'hero_description',
                'avatar',
                'avatar_preview',
                'resume',
            )
        }),
        ('Hero Quick Counters', {
            'fields': (
                'years_of_learning',
                'total_projects',
                'total_certificates',
                'courses_completed',
                'hours_of_coding',
            )
        }),
        ('About Me Section', {
            'fields': ('about_text', 'about_detailed_text', 'about_image')
        }),
        ('Social Links', {
            'fields': (
                'github_url',
                'linkedin_url',
                'twitter_url',
                'instagram_url',
            )
        }),
        ('Audit Metadata', {
            'classes': ('collapse',),
            'fields': ('created_at', 'updated_at'),
        }),
    )

    # ─── 3. Dynamic Name Fallback Helper ──────────────────────────
    @admin.display(description='Full Name')
    def get_display_name(self, obj):
        if hasattr(obj, 'full_name') and callable(getattr(obj, 'full_name')):
            return obj.full_name()
        if hasattr(obj, 'full_name'):
            return obj.full_name
        return f"{getattr(obj, 'first_name', '')} {getattr(obj, 'last_name', '')}".strip() or "Profile"

    # ─── 4. Avatar Image Preview in Admin ─────────────────────────
    @admin.display(description='Avatar Preview')
    def avatar_preview(self, obj):
        if obj.avatar:
            return format_html(
                '<img src="{}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%; border: 2px solid #2563eb;" />',
                obj.avatar.url
            )
        return "No image uploaded"

    # ─── 5. Singleton Rule (Only 1 Profile Allowed) ───────────────
    def has_add_permission(self, request):
        if Profile.objects.exists():
            return False
        return super().has_add_permission(request)