import os
import shutil
import logging
from django.conf import settings
from django.core.files.storage import default_storage

logger = logging.getLogger('apps')


class StorageService:
    """Utility service for physical media file handling, cleanups, and storage calculations."""

    @staticmethod
    def remove_file(file_path):
        """Deletes physical file from local or cloud storage safely."""
        if not file_path:
            return False

        try:
            if hasattr(file_path, 'path') and os.path.exists(file_path.path):
                os.remove(file_path.path)
                return True
            elif default_storage.exists(str(file_path)):
                default_storage.delete(str(file_path))
                return True
        except Exception as e:
            logger.error(f"Error deleting file {file_path}: {str(e)}", exc_info=True)
        return False

    @staticmethod
    def get_storage_stats():
        """Calculates total size used in media directory."""
        media_root = settings.MEDIA_ROOT
        total_size = 0
        file_count = 0

        if not os.path.exists(media_root):
            return {'total_files': 0, 'size_bytes': 0, 'size_mb': 0.0}

        for root, _, files in os.walk(media_root):
            for f in files:
                if f != '.gitkeep':
                    fp = os.path.join(root, f)
                    if os.path.exists(fp):
                        total_size += os.path.getsize(fp)
                        file_count += 1

        size_mb = round(total_size / (1024 * 1024), 2)
        return {
            'total_files': file_count,
            'size_bytes': total_size,
            'size_mb': size_mb,
            'size_display': f"{size_mb} MB" if size_mb >= 1 else f"{round(total_size / 1024, 1)} KB"
        }