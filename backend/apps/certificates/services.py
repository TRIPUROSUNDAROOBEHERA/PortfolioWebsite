from .models import Certificate


def get_featured_certificates(limit=4):
    """Retrieve featured certificates for the Home page card."""
    return Certificate.objects.filter(is_featured=True).order_by('order', '-created_at')[:limit]


def reorder_certificates(order_data):
    """
    Batch update certificate display ordering.
    Expects order_data: [{'id': 1, 'order': 0}, {'id': 2, 'order': 1}]
    """
    for item in order_data:
        cert_id = item.get('id')
        new_order = item.get('order')
        if cert_id is not None and new_order is not None:
            Certificate.objects.filter(id=cert_id).update(order=new_order)