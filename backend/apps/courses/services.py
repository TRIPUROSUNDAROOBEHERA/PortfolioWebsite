from .models import Course


def get_featured_courses(limit=4):
    """Fetch featured completed courses for the Home page grid card."""
    return Course.objects.filter(is_featured=True, is_completed=True).order_by('order', '-created_at')[:limit]


def reorder_courses(order_data):
    """
    Batch update course sequence order.
    Expects order_data: [{'id': 1, 'order': 0}, {'id': 2, 'order': 1}]
    """
    for item in order_data:
        course_id = item.get('id')
        new_order = item.get('order')
        if course_id is not None and new_order is not None:
            Course.objects.filter(id=course_id).update(order=new_order)