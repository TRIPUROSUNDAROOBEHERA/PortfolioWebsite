from .models import Project


def get_featured_projects():
    """Retrieve all featured projects ordered for the home page cards."""
    return Project.objects.filter(is_featured=True).order_by('order', '-created_at')


def reorder_projects(order_data):
    """
    Batch update project sequence ordering.
    Expects order_data: [{'id': 1, 'order': 0}, {'id': 2, 'order': 1}]
    """
    for item in order_data:
        project_id = item.get('id')
        new_order = item.get('order')
        if project_id is not None and new_order is not None:
            Project.objects.filter(id=project_id).update(order=new_order)