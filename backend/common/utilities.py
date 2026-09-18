import os
import re
from django.utils.text import slugify


def get_client_ip(request):
    """Extracts client IP address safely considering reverse proxies."""
    if not request:
        return None
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR')


def generate_unique_slug(model_instance, source_field, slug_field="slug"):
    """
    Generates a unique URL slug by checking existing database records.
    Example: 'Portfolio Website' -> 'portfolio-website', 'portfolio-website-1'
    """
    model_class = model_instance.__class__
    source_val = getattr(model_instance, source_field)
    base_slug = slugify(source_val)
    slug = base_slug
    counter = 1

    while model_class.objects.filter(**{slug_field: slug}).exclude(pk=model_instance.pk).exists():
        slug = f"{base_slug}-{counter}"
        counter += 1

    return slug


def format_bytes_to_mb(byte_count):
    """Converts raw byte integers to formatted KB/MB strings."""
    if not byte_count:
        return "0 KB"
    if byte_count < 1024 * 1024:
        return f"{round(byte_count / 1024, 1)} KB"
    return f"{round(byte_count / (1024 * 1024), 2)} MB"