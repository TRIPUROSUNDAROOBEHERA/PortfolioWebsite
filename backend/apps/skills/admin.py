from django.contrib import admin
from django.utils.html import format_html
from .models import Skill


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    # ─── 1. List View Display & Inline Controls ───────────────────
    list_display = (
        'name',
        'category',
        'icon_name',
        'proficiency_display',
        'is_featured',
        'order',
    )
    list_display_links = ('name',)
    list_editable = ('category', 'is_featured', 'order')
    list_filter = ('category', 'is_featured')
    search_fields = ('name', 'category', 'icon_name')
    ordering = ('order', 'name')
    readonly_fields = ('proficiency_bar_preview',)

    # ─── 2. Fieldsets Layout ──────────────────────────────────────
    fieldsets = (
        ('Skill Details', {
            'fields': (
                'name',
                'category',
                'proficiency_percentage',
                'proficiency_bar_preview',
            )
        }),
        ('Icon Assets', {
            'fields': (
                'icon_name',
                'icon_image',
            )
        }),
        ('Display & Ordering', {
            'fields': (
                'is_featured',
                'order',
            )
        }),
    )

    # ─── 3. Progress Bar Preview in Table ─────────────────────────
    @admin.display(description='Proficiency', ordering='proficiency_percentage')
    def proficiency_display(self, obj):
        pct = obj.proficiency_percentage or 0
        return format_html(
            '''
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 80px; background-color: #e2e8f0; height: 8px; border-radius: 9999px; overflow: hidden;">
                    <div style="width: {}%; background: linear-gradient(90deg, #2563eb, #9333ea); height: 100%;"></div>
                </div>
                <span style="font-weight: 700; font-size: 11px; color: #334155;">{}%</span>
            </div>
            ''',
            pct,
            pct
        )

    # ─── 4. Progress Bar Preview inside Edit Form ─────────────────
    @admin.display(description='Proficiency Preview')
    def proficiency_bar_preview(self, obj):
        pct = obj.proficiency_percentage or 0
        return format_html(
            '''
            <div style="max-width: 250px; padding: 6px 0;">
                <div style="width: 100%; background-color: #e2e8f0; height: 10px; border-radius: 9999px; overflow: hidden; margin-bottom: 4px;">
                    <div style="width: {}%; background: linear-gradient(90deg, #2563eb, #9333ea); height: 100%;"></div>
                </div>
                <span style="font-weight: bold; font-size: 12px; color: #2563eb;">Current Value: {}%</span>
            </div>
            ''',
            pct,
            pct
        )