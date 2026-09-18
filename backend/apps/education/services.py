from .models import Education


def get_timeline_education():
    """Retrieve all active education entries ordered chronologically for the timeline."""
    return Education.objects.filter(is_active=True).order_by('order', '-end_year')


def reorder_education_timeline(order_data):
    """
    Batch update education sequence ordering.
    Expects order_data: [{'id': 1, 'order': 0}, {'id': 2, 'order': 1}]
    """
    for item in order_data:
        edu_id = item.get('id')
        new_order = item.get('order')
        if edu_id is not None and new_order is not None:
            Education.objects.filter(id=edu_id).update(order=new_order)