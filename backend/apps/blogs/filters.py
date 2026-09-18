import django_filters
from .models import BlogPost


class BlogPostFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name='category__slug', lookup_expr='exact')
    tag = django_filters.CharFilter(field_name='tags', lookup_expr='icontains')
    is_featured = django_filters.BooleanFilter()
    year = django_filters.NumberFilter(field_name='published_date', lookup_expr='year')

    class Meta:
        model = BlogPost
        fields = ['category', 'tag', 'is_featured', 'year']