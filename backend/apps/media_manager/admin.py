from django.contrib import admin
from .models import MediaAsset
from .services import delete_physical_file


@admin.register(MediaAsset)
class MediaAssetAdmin(admin.ModelAdmin):
    list_display = ('title', 'folder_category', 'file_type', 'file_size_display', 'uploaded_by', 'created_at')
    list_filter = ('folder_category', 'file_type', 'created_at')
    search_fields = ('title', 'alt_text')
    readonly_fields = ('file_type', 'file_size_bytes', 'created_at', 'updated_at')
    ordering = ('-created_at',)

    def delete_model(self, request, obj):
        delete_physical_file(obj.file)
        super().delete_model(request, obj)

    def delete_queryset(self, request, queryset):
        for obj in queryset:
            delete_physical_file(obj.file)
        super().delete_queryset(request, queryset)