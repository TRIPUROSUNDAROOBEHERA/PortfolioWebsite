from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.urls import include, path
from django.views.generic import RedirectView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

# ─── 1. Health Check View Resolver ──────────────────────────────
try:
    from apps.dashboard.views import health_check
except ImportError:
    try:
        from apps.accounts.views import HealthCheckView
        health_check = HealthCheckView.as_view()
    except ImportError:
        @api_view(['GET'])
        @permission_classes([AllowAny])
        def health_check(request):
            return Response({'status': 'healthy', 'backend': 'Online'})


# ─── 2. Root API Directory ───────────────────────────────────────
@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request, format=None):
    """
    Root API directory listing all accessible backend services.
    """
    return Response({
        'status': 'online',
        'version': 'v1',
        'endpoints': {
            'health': '/api/health/',
            'auth': '/api/auth/login/',
            'profile': '/api/profile/',
            'projects': '/api/projects/',
            'skills': '/api/skills/',
            'blogs': '/api/blogs/',
            'certificates': '/api/certificates/',
            'education': '/api/education/',
            'courses': '/api/courses/',
            'achievements': '/api/achievements/',
            'publications': '/api/publications/',
            'research': '/api/research/',
            'resources': '/api/resources/',
            'future_plan': '/api/future-plan/',
            'contact': '/api/contact/',
            'dashboard': '/api/dashboard/',
            'notifications': '/api/notifications/',
            'audit_logs': '/api/audit-logs/',
            'media': '/api/media/',
            'settings': '/api/settings/',
        }
    })


# ─── 3. Main URL Patterns ─────────────────────────────────────────
urlpatterns = [
    # Root Redirect to Admin
    path('', RedirectView.as_view(url='/admin/', permanent=False), name='root-redirect'),

    # ─── Admin Direct Logout ───
    path(
        'admin/logout/',
        auth_views.LogoutView.as_view(next_page='/admin/login/'),
        name='admin_direct_logout',
    ),

    # ─── Password Reset Flow (Full HTML + Text Fallback) ───
    path(
        'admin/password_reset/',
        auth_views.PasswordResetView.as_view(
            template_name='admin/password_reset/password_reset_form.html',
            email_template_name='admin/password_reset/password_reset_email.txt',
            html_email_template_name='admin/password_reset/password_reset_email.html',
            subject_template_name='admin/password_reset/password_reset_subject.txt',
            success_url='/admin/password_reset/done/',
        ),
        name='admin_password_reset',
    ),
    path(
        'admin/password_reset/done/',
        auth_views.PasswordResetDoneView.as_view(
            template_name='admin/password_reset/password_reset_done.html'
        ),
        name='password_reset_done',
    ),
    path(
        'admin/reset/<uidb64>/<token>/',
        auth_views.PasswordResetConfirmView.as_view(
            template_name='admin/password_reset/password_reset_confirm.html',
            success_url='/admin/reset/done/',
        ),
        name='password_reset_confirm',
    ),
    path(
        'admin/reset/done/',
        auth_views.PasswordResetCompleteView.as_view(
            template_name='admin/password_reset/password_reset_complete.html'
        ),
        name='password_reset_complete',
    ),

    # ─── Core Django Admin Site ───
    path('admin/', admin.site.urls),

    # ─── System Health & Discovery ───
    path('api/health/', health_check, name='api_health_check'),
    path('api/', api_root, name='api-root'),

    # ─── Auth & User Management ───
    path('api/auth/', include('apps.accounts.urls')),
    path('api/accounts/', include('apps.accounts.urls')),

    # ─── Modular Content Domain Endpoints ───
    path('api/profile/', include('apps.profile.urls')),
    path('api/projects/', include('apps.projects.urls')),
    path('api/skills/', include('apps.skills.urls')),
    path('api/blogs/', include('apps.blogs.urls')),
    path('api/certificates/', include('apps.certificates.urls')),
    path('api/education/', include('apps.education.urls')),
    path('api/courses/', include('apps.courses.urls')),
    path('api/achievements/', include('apps.achievements.urls')),
    path('api/publications/', include('apps.publications.urls')),
    path('api/research/', include('apps.research.urls')),
    path('api/resources/', include('apps.resources.urls')),
    path('api/future-plan/', include('apps.future_plan.urls')),
    path('api/contact/', include('apps.contact.urls')),
    path('api/dashboard/', include('apps.dashboard.urls')),
    path('api/notifications/', include('apps.notifications.urls')),
    path('api/audit-logs/', include('apps.audit_logs.urls')),
    path('api/media/', include('apps.media_manager.urls')),
    path('api/settings/', include('apps.settings.urls')),
]

# ─── 4. Static and Media File Handling (Development) ──────────────
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)