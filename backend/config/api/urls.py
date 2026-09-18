from django.urls import path, include

app_name = 'api'

urlpatterns = [
    path('auth/', include('apps.accounts.urls')),
    path('profile/', include('apps.profile.urls')),
    path('projects/', include('apps.projects.urls')),
    path('skills/', include('apps.skills.urls')),
    path('blogs/', include('apps.blogs.urls')),
    path('certificates/', include('apps.certificates.urls')),
    path('education/', include('apps.education.urls')),
    path('courses/', include('apps.courses.urls')),
    path('achievements/', include('apps.achievements.urls')),
    path('publications/', include('apps.publications.urls')),
    path('research/', include('apps.research.urls')),
    path('resources/', include('apps.resources.urls')),
    path('future-plan/', include('apps.future_plan.urls')),
    path('contact/', include('apps.contact.urls')),
    path('dashboard/', include('apps.dashboard.urls')),
    path('notifications/', include('apps.notifications.urls')),
    path('audit-logs/', include('apps.audit_logs.urls')),
    path('media/', include('apps.media_manager.urls')),
    path('settings/', include('apps.settings.urls')),
]