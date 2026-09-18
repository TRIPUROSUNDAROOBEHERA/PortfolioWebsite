import os
from .models import MediaAsset


def delete_physical_file(file_field):
    """Removes the file from local storage when an asset record is deleted."""
    if file_field and os.path.isfile(file_field.path):
        try:
            os.remove(file_field.path)
        except OSError:
            pass


def get_media_storage_stats():
    """Calculate aggregated storage statistics for Admin Dashboard."""
    total_files = MediaAsset.objects.count()
    total_bytes = sum(MediaAsset.objects.values_list('file_size_bytes', flat=True))
    mb_used = round(total_bytes / (1024 * 1024), 2)

    return {
        'total_files': total_files,
        'total_size_mb': mb_used,
        'total_size_display': f"{mb_used} MB"
    }