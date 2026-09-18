from django.utils import timezone


def get_client_ip(request):
    """Extract client IP address from HTTP headers."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        return x_forwarded_for.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR')


def record_successful_login(user, request):
    """Update user login timestamps and IP addresses."""
    user.last_login = timezone.now()
    user.last_login_ip = get_client_ip(request)
    user.save(update_fields=['last_login', 'last_login_ip'])