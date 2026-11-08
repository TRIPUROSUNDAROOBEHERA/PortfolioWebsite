from django.contrib.admin.models import LogEntry, ADDITION, CHANGE, DELETION
from django.contrib.auth import get_user_model
from django.apps import apps
from .utils import get_real_system_metrics

User = get_user_model()

def get_action_details(entry):
    model_name = entry.content_type.model if entry.content_type else 'item'
    object_repr = entry.object_repr

    if entry.action_flag == ADDITION:
        action_verb = f"New {model_name.replace('_', ' ')} added"
        icon = "fa-solid fa-plus"
        color_class = "green"
    elif entry.action_flag == CHANGE:
        action_verb = f"{model_name.replace('_', ' ').capitalize()} updated"
        icon = "fa-solid fa-pen-to-square"
        color_class = "orange"
    elif entry.action_flag == DELETION:
        action_verb = f"{model_name.replace('_', ' ').capitalize()} deleted"
        icon = "fa-solid fa-trash-can"
        color_class = "pink"
    else:
        action_verb = f"{model_name.replace('_', ' ').capitalize()} modified"
        icon = "fa-solid fa-bolt"
        color_class = "blue"

    if 'achievement' in model_name:
        icon = "fa-solid fa-trophy"
    elif 'blog' in model_name:
        icon = "fa-solid fa-pen-nib"
    elif 'media' in model_name:
        icon = "fa-regular fa-image"
    elif 'user' in model_name:
        icon = "fa-solid fa-user-plus"
    elif 'project' in model_name:
        icon = "fa-solid fa-laptop-code"
    elif 'skill' in model_name:
        icon = "fa-solid fa-layer-group"
    elif 'education' in model_name:
        icon = "fa-solid fa-graduation-cap"
    elif 'certificate' in model_name:
        icon = "fa-solid fa-award"

    return {
        'title': action_verb,
        'description': object_repr,
        'icon': icon,
        'color': color_class,
        'timestamp': entry.action_time,
        'user': entry.user.username if entry.user else 'System'
    }

def system_status_processor(request):
    if request.path.startswith('/admin/'):
        # 1. Fetch live system logs
        raw_logs = LogEntry.objects.select_related('user', 'content_type').order_by('-action_time')[:6]
        recent_activities = [get_action_details(log) for log in raw_logs]

        # 2. Count live records per modular app
        def get_model_count(app_label, model_name):
            try:
                model = apps.get_model(app_label, model_name)
                return model.objects.count()
            except Exception:
                return 0

        total_achievements = get_model_count('achievements', 'Achievement')
        total_blogs = get_model_count('blogs', 'BlogPost')
        total_views = get_model_count('dashboard', 'PageView')
        active_users = User.objects.filter(is_active=True).count()
        total_projects = get_model_count('projects', 'Project')
        total_skills = get_model_count('skills', 'Skill')
        total_education = get_model_count('education', 'Education')
        total_certificates = get_model_count('certificates', 'Certificate')
        total_messages = get_model_count('contact', 'ContactMessage')
        total_media = get_model_count('media_manager', 'MediaAsset')
        total_courses = get_model_count('courses', 'Course')
        total_future_plans = get_model_count('future_plan', 'FuturePlan')
        total_publications = get_model_count('publications', 'Publication')
        total_research = get_model_count('research', 'ResearchPaper')
        total_resources = get_model_count('resources', 'Resource')

        return {
            'system_metrics': get_real_system_metrics(),
            'recent_activities': recent_activities,
            'real_counts': {
                'achievements': total_achievements,
                'blogs': total_blogs,
                'views': total_views,
                'users': active_users if active_users > 0 else 1,
                'projects': total_projects,
                'skills': total_skills,
                'education': total_education,
                'certificates': total_certificates,
                'messages': total_messages,
                'media': total_media,
                'courses': total_courses,
                'future_plans': total_future_plans,
                'publications': total_publications,
                'research': total_research,
                'resources': total_resources,
            }
        }
    return {}