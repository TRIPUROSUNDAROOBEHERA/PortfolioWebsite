from django.apps import apps
from django.db.models import Sum


def get_model_safe(app_label, model_name):
    """Safely retrieves a model class across installed apps."""
    try:
        return apps.get_model(app_label, model_name)
    except LookupError:
        return None


def get_dashboard_overview_stats():
    """
    Aggregates full metrics for the Admin Dashboard & CMS modules:
    - Core Content: Projects, Education, Certificates, Courses, Achievements, Blogs, Skills, Future Plans, Research, Publications
    - Operations & Assets: Messages, Resources, Media Assets, Audit Logs, Notifications
    """
    # Content Models
    Project = get_model_safe('projects', 'Project')
    Education = get_model_safe('education', 'Education')
    Certificate = get_model_safe('certificates', 'Certificate')
    Course = get_model_safe('courses', 'Course')
    Achievement = get_model_safe('achievements', 'Achievement')
    BlogPost = get_model_safe('blogs', 'BlogPost')
    Skill = get_model_safe('skills', 'Skill')
    FuturePlan = get_model_safe('future_plan', 'FuturePlan')
    ResearchPaper = get_model_safe('research', 'ResearchPaper')
    Publication = get_model_safe('publications', 'Publication')

    # Operations & System Models
    ContactMessage = get_model_safe('contact', 'ContactMessage')
    Resource = get_model_safe('resources', 'Resource')
    MediaAsset = get_model_safe('media_manager', 'MediaAsset')
    AuditLog = get_model_safe('audit_logs', 'AuditLog')
    Notification = get_model_safe('notifications', 'Notification')

    # Media Storage Calculation
    total_media_bytes = sum(MediaAsset.objects.values_list('file_size_bytes', flat=True)) if MediaAsset else 0
    total_media_mb = round(total_media_bytes / (1024 * 1024), 2)

    return {
        'projects': {
            'total': Project.objects.count() if Project else 0,
            'featured': Project.objects.filter(is_featured=True).count() if Project else 0,
        },
        'education': {
            'total': Education.objects.count() if Education else 0,
            'active': Education.objects.filter(is_active=True).count() if Education else 0,
        },
        'certificates': {
            'total': Certificate.objects.count() if Certificate else 0,
            'featured': Certificate.objects.filter(is_featured=True).count() if Certificate else 0,
        },
        'courses': {
            'total': Course.objects.count() if Course else 0,
            'completed': Course.objects.filter(is_completed=True).count() if Course else 0,
        },
        'achievements': {
            'total': Achievement.objects.count() if Achievement else 0,
            'featured': Achievement.objects.filter(is_featured=True).count() if Achievement else 0,
        },
        'blogs': {
            'total': BlogPost.objects.count() if BlogPost else 0,
            'published': BlogPost.objects.filter(is_published=True).count() if BlogPost else 0,
            'total_reads': (BlogPost.objects.aggregate(total=Sum('views_count'))['total'] or 0) if BlogPost else 0,
        },
        'skills': {
            'total': Skill.objects.count() if Skill else 0,
            'featured': Skill.objects.filter(is_featured=True).count() if Skill else 0,
        },
        'future_plans': {
            'total': FuturePlan.objects.count() if FuturePlan else 0,
            'active': FuturePlan.objects.filter(is_active=True).count() if FuturePlan else 0,
        },
        'research': {
            'total': ResearchPaper.objects.count() if ResearchPaper else 0,
            'published': ResearchPaper.objects.filter(status='published').count() if ResearchPaper else 0,
        },
        'publications': {
            'total': Publication.objects.count() if Publication else 0,
            'total_citations': (Publication.objects.aggregate(total=Sum('citation_count'))['total'] or 0) if Publication else 0,
        },
        'messages': {
            'total': ContactMessage.objects.count() if ContactMessage else 0,
            'unread': ContactMessage.objects.filter(is_read=False, is_archived=False).count() if ContactMessage else 0,
        },
        'resources': {
            'total': Resource.objects.count() if Resource else 0,
            'total_downloads': (Resource.objects.aggregate(total=Sum('download_count'))['total'] or 0) if Resource else 0,
        },
        'media': {
            'total_files': MediaAsset.objects.count() if MediaAsset else 0,
            'storage_used_mb': total_media_mb,
        },
        'audit_logs': {
            'total_entries': AuditLog.objects.count() if AuditLog else 0,
        },
        'notifications': {
            'unread': Notification.objects.filter(is_read=False).count() if Notification else 0,
        },
    }