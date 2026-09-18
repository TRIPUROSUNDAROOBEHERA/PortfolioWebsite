from django.db.models import F
from .models import Resource


def get_grouped_resources():
    """
    Fetch active resources grouped by their type for the UI list widget:
    - Notes & PDFs
    - Coding Tutorials
    - E-Books
    - Important Links
    """
    return Resource.objects.filter(is_active=True).order_by('order', '-created_at')


def increment_resource_download(resource_id):
    """Increment the download counter for a given resource."""
    Resource.objects.filter(id=resource_id).update(download_count=F('download_count') + 1)