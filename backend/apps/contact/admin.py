from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    # ─── 1. Columns Shown in Table ───
    list_display = (
        'name',
        'email',
        'subject_preview',
        'status_badge',
        'archive_badge',
        'ip_address',
        'created_at',
        'row_actions',  # Direct Edit & Delete buttons on each row
    )

    # Clickable column links to open the detail view
    list_display_links = ('name', 'email')

    # ─── 2. Sidebar Filter Controls ───
    list_filter = (
        'is_read',
        'is_archived',
        ('created_at', admin.DateFieldListFilter),
    )

    # ─── 3. Search Bar Across Multiple Fields ───
    search_fields = ('name', 'email', 'subject', 'message', 'ip_address')

    # ─── 4. Sorting & Pagination ───
    ordering = ('-created_at',)
    list_per_page = 20
    date_hierarchy = 'created_at'

    # ─── 5. Read-Only Attributes ───
    readonly_fields = ('name', 'email', 'subject', 'message', 'ip_address', 'created_at')

    # ─── 6. Detail / View Layout ───
    fieldsets = (
        ('Sender Information', {
            'fields': ('name', 'email', 'ip_address', 'created_at'),
        }),
        ('Message Content', {
            'fields': ('subject', 'message'),
        }),
        ('Status & Controls', {
            'fields': ('is_read', 'is_archived'),
        }),
    )

    def has_add_permission(self, request):
        # Inquiries should come from the website form, not manually typed in admin
        return False

    # ─── 7. Badges for Status & Archive ───
    @admin.display(description='Subject')
    def subject_preview(self, obj):
        text = getattr(obj, 'subject', '') or 'Portfolio Inquiry'
        return text[:30] + '...' if len(text) > 30 else text

    @admin.display(description='Read Status', ordering='is_read')
    def status_badge(self, obj):
        if obj.is_read:
            return format_html(
                '<span style="background-color:#dcfce7; color:#15803d; padding:4px 9px; border-radius:6px; font-weight:700; font-size:11px; display:inline-block;">READ</span>'
            )
        return format_html(
            '<span style="background-color:#fef3c7; color:#b45309; padding:4px 9px; border-radius:6px; font-weight:700; font-size:11px; display:inline-block;">UNREAD</span>'
        )

    @admin.display(description='Archive Status', ordering='is_archived')
    def archive_badge(self, obj):
        if obj.is_archived:
            return format_html(
                '<span style="background-color:#fee2e2; color:#b91c1c; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:600; display:inline-block;">Archived</span>'
            )
        return format_html(
            '<span style="background-color:#f1f5f9; color:#64748b; padding:3px 8px; border-radius:6px; font-size:11px; font-weight:600; display:inline-block;">Active</span>'
        )

    # ─── 8. Direct Row Action Buttons ───
    @admin.display(description='Actions')
    def row_actions(self, obj):
        change_url = reverse('admin:contact_contactmessage_change', args=[obj.pk])
        delete_url = reverse('admin:contact_contactmessage_delete', args=[obj.pk])

        return format_html(
            '''
            <div style="display:flex; align-items:center; gap:6px; white-space:nowrap;">
                <a href="{}" style="background:#e0e7ff; color:#4338ca; padding:4px 9px; border-radius:6px; font-size:11px; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:4px;">
                    <i class="fa-solid fa-pen-to-square"></i> Edit
                </a>
                <a href="{}" style="background:#fee2e2; color:#b91c1c; padding:4px 9px; border-radius:6px; font-size:11px; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:4px;">
                    <i class="fa-solid fa-trash-can"></i> Delete
                </a>
            </div>
            ''',
            change_url,
            delete_url,
        )

    # ─── 9. Bulk Action Options ───
    actions = ['delete_selected', 'mark_as_read', 'mark_as_unread', 'archive_messages', 'unarchive_messages']

    @admin.action(description='Mark selected messages as READ')
    def mark_as_read(self, request, queryset):
        rows = queryset.update(is_read=True)
        self.message_user(request, f"{rows} message(s) marked as read.")

    @admin.action(description='Mark selected messages as UNREAD')
    def mark_as_unread(self, request, queryset):
        rows = queryset.update(is_read=False)
        self.message_user(request, f"{rows} message(s) marked as unread.")

    @admin.action(description='Move selected to ARCHIVE')
    def archive_messages(self, request, queryset):
        rows = queryset.update(is_archived=True)
        self.message_user(request, f"{rows} message(s) moved to archive.")

    @admin.action(description='Restore selected from ARCHIVE')
    def unarchive_messages(self, request, queryset):
        rows = queryset.update(is_archived=False)
        self.message_user(request, f"{rows} message(s) restored from archive.")