from .models import ResearchPaper


def get_featured_research():
    """Retrieve featured research items for portfolio display."""
    return ResearchPaper.objects.filter(is_featured=True).order_by('order', '-created_at')


def reorder_research(order_data):
    """
    Batch update research display ordering.
    Expects order_data: [{'id': 1, 'order': 0}, {'id': 2, 'order': 1}]
    """
    for item in order_data:
        paper_id = item.get('id')
        new_order = item.get('order')
        if paper_id is not None and new_order is not None:
            ResearchPaper.objects.filter(id=paper_id).update(order=new_order)