from .models import AuditLog, ActionType


def get_client_ip(request):
    """Extract client IP address from request META headers."""
    if not request:
        return None
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR')


def log_action(request, action, module, description):
    """Utility helper to record an audit log entry from any view/service."""
    user = request.user if request and request.user.is_authenticated else None
    user_email = user.email if user else "Anonymous/System"
    ip = get_client_ip(request) if request else None
    ua = request.META.get('HTTP_USER_AGENT', '') if request else ''

    return AuditLog.objects.create(
        user=user,
        user_email=user_email,
        action=action,
        module=module,
        description=description,
        ip_address=ip,
        user_agent=ua
    )