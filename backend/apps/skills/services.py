from .models import Skill, SkillCategory


def get_grouped_skills():
    """Fetch all featured skills grouped by category for structured UI rendering."""
    skills = Skill.objects.filter(is_featured=True).order_by('order', 'name')
    grouped = {category.value: [] for category in SkillCategory}
    
    for skill in skills:
        if skill.category in grouped:
            grouped[skill.category].append(skill)
            
    return grouped


def reorder_skills(order_data):
    """
    Batch update skill ordering.
    Expects order_data: [{'id': 1, 'order': 0}, {'id': 2, 'order': 1}]
    """
    for item in order_data:
        skill_id = item.get('id')
        new_order = item.get('order')
        if skill_id is not None and new_order is not None:
            Skill.objects.filter(id=skill_id).update(order=new_order)