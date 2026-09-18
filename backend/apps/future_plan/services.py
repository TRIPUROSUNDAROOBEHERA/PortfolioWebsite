from .models import FuturePlan


def get_active_plans():
    """Retrieve active future goals ordered for the Home page widget."""
    return FuturePlan.objects.filter(is_active=True).order_by('order', '-created_at')


def reorder_future_plans(order_data):
    """
    Batch update plan display ordering.
    Expects order_data: [{'id': 1, 'order': 0}, {'id': 2, 'order': 1}]
    """
    for item in order_data:
        plan_id = item.get('id')
        new_order = item.get('order')
        if plan_id is not None and new_order is not None:
            FuturePlan.objects.filter(id=plan_id).update(order=new_order)