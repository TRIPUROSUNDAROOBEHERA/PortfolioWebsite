from .models import Achievement


def get_featured_achievements(limit=5):
    """Retrieve featured achievements for the home page widget."""
    return Achievement.objects.filter(is_featured=True).order_by('order', '-created_at')[:limit]


def reorder_achievements(order_data):
    """
    Batch update achievement sequence ordering.
    Expects order_data: [{'id': 1, 'order': 0}, {'id': 2, 'order': 1}]
    """
    for item in order_data:
        achievement_id = item.get('id')
        new_order = item.get('order')
        if achievement_id is not None and new_order is not None:
            Achievement.objects.filter(id=achievement_id).update(order=new_order)