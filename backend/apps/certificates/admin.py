from django.contrib import admin
from .models import Certificate


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('title', 'issuer', 'issue_date', 'credential_id', 'is_featured', 'order', 'created_at')
    list_filter = ('issuer', 'is_featured')
    search_fields = ('title', 'issuer', 'credential_id')
    list_editable = ('is_featured', 'order')
    ordering = ('order', '-created_at')

    fieldsets = (
        ('Certificate Details', {
            'fields': ('title', 'issuer', 'issue_date', 'credential_id')
        }),
        ('Verification & Files', {
            'fields': ('credential_url', 'thumbnail', 'certificate_file')
        }),
        ('Display & Ordering', {
            'fields': ('is_featured', 'order')
        }),
    )