from django.db.models import F
from .models import BlogPost


def increment_blog_views(post_id):
    """Atomically increment the view counter for a blog post."""
    BlogPost.objects.filter(id=post_id).update(views_count=F('views_count') + 1)


def get_latest_posts(limit=3):
    """Retrieve the most recent published blog posts for the home widget."""
    return BlogPost.objects.filter(is_published=True).order_by('-published_date', '-created_at')[:limit]


def get_featured_posts(limit=3):
    """Retrieve featured knowledge posts for the Blog section."""
    return BlogPost.objects.filter(is_published=True, is_featured=True).order_by('-published_date')[:limit]