import django_filters
from .models import Project, ProjectCategory


class ProjectFilter(django_filters.FilterSet):
    category = django_filters.ChoiceFilter(choices=ProjectCategory.choices)
    is_featured = django_filters.BooleanFilter()
    tech = django_filters.CharFilter(field_name='technologies', lookup_expr='icontains')

    class Meta:
        model = Project
        fields = ['category', 'is_featured', 'tech']