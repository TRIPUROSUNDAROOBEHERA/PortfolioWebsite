import os
from django.core.exceptions import ValidationError

ALLOWED_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']
ALLOWED_DOCUMENT_EXTENSIONS = ['.pdf', '.doc', '.docx', '.zip']
MAX_FILE_SIZE_MB = 10


def validate_file_size(file_obj):
    """Ensure uploaded files do not exceed maximum file size limit (10MB)."""
    max_size = MAX_FILE_SIZE_MB * 1024 * 1024
    if file_obj.size > max_size:
        raise ValidationError(f"File size exceeds the allowable limit of {MAX_FILE_SIZE_MB}MB.")


def validate_file_extension(file_obj):
    """Validate allowed file extensions for images and documents."""
    ext = os.path.splitext(file_obj.name)[1].lower()
    allowed_extensions = ALLOWED_IMAGE_EXTENSIONS + ALLOWED_DOCUMENT_EXTENSIONS
    if ext not in allowed_extensions:
        raise ValidationError(
            f"Unsupported file extension '{ext}'. Allowed: {', '.join(allowed_extensions)}"
        )