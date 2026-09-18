from .models import Publication


def get_featured_publications():
    """Retrieve featured publications for summary views."""
    return Publication.objects.filter(is_featured=True).order_by('order', '-published_date')


def reorder_publications(order_data):
    """
    Batch update publication ordering.
    Expects order_data: [{'id': 1, 'order': 0}, {'id': 2, 'order': 1}]
    """
    for item in order_data:
        pub_id = item.get('id')
        new_order = item.get('order')
        if pub_id is not None and new_order is not None:
            Publication.objects.filter(id=pub_id).update(order=new_order)