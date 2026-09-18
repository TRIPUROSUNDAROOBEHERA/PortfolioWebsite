import os
from django.core.exceptions import ValidationError
from .constants import MAX_UPLOAD_SIZE_BYTES, ALLOWED_IMAGE_EXTENSIONS, ALLOWED_DOCUMENT_EXTENSIONS


def validate_file_upload(file_obj):
    """Validates both file size and supported extension for media uploads."""
    if file_obj.size > MAX_UPLOAD_SIZE_BYTES:
        raise ValidationError(f"File size cannot exceed {MAX_UPLOAD_SIZE_BYTES / (1024 * 1024)}MB.")

    ext = os.path.splitext(file_obj.name)[1].lower()
    allowed = ALLOWED_IMAGE_EXTENSIONS + ALLOWED_DOCUMENT_EXTENSIONS

    if ext not in allowed:
        raise ValidationError(f"Unsupported file format '{ext}'. Allowed: {', '.join(allowed)}")


def validate_image_only(file_obj):
    """Restricts uploads strictly to visual image formats."""
    ext = os.path.splitext(file_obj.name)[1].lower()
    if ext not in ALLOWED_IMAGE_EXTENSIONS:
        raise ValidationError(f"Only image formats ({', '.join(ALLOWED_IMAGE_EXTENSIONS)}) are permitted.")