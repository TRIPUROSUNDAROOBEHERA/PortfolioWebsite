from datetime import timedelta
from django.utils import timezone
from django.db.models import Count
from django.db.models.functions import TruncDate
from .models import PageView


def parse_device_type(user_agent_str):
    """Categorize device type from user-agent string."""
    if not user_agent_str:
        return "Desktop"
    ua = user_agent_str.lower()
    if "mobile" in ua or "android" in ua or "iphone" in ua:
        return "Mobile"
    if "tablet" in ua or "ipad" in ua:
        return "Tablet"
    return "Desktop"


def parse_browser(user_agent_str):
    """Extract browser identity from user-agent string."""
    if not user_agent_str:
        return "Other"
    ua = user_agent_str.lower()
    if "edg" in ua:
        return "Edge"
    if "chrome" in ua and "chromium" not in ua and "edg" not in ua:
        return "Chrome"
    if "firefox" in ua:
        return "Firefox"
    if "safari" in ua and "chrome" not in ua:
        return "Safari"
    return "Other"


def get_traffic_analytics(days=30):
    """
    Computes time-series traffic metrics, device distribution,
    and top accessed portfolio sections.
    """
    start_date = timezone.now() - timedelta(days=days)
    views_qs = PageView.objects.filter(timestamp__gte=start_date)

    daily_traffic = (
        views_qs.annotate(date=TruncDate('timestamp'))
        .values('date')
        .annotate(views=Count('id'))
        .order_by('date')
    )

    device_distribution = (
        views_qs.values('device_type')
        .annotate(count=Count('id'))
        .order_by('-count')
    )

    top_pages = (
        views_qs.values('path')
        .annotate(count=Count('id'))
        .order_by('-count')[:6]
    )

    return {
        'period_days': days,
        'total_views': views_qs.count(),
        'daily_traffic': [
            {'date': item['date'].strftime('%Y-%m-%d') if item['date'] else '', 'views': item['views']}
            for item in daily_traffic
        ],
        'device_distribution': list(device_distribution),
        'top_pages': list(top_pages),
    }