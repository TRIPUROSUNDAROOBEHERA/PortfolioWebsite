from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from .constants import DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE


class StandardResultsSetPagination(PageNumberPagination):
    """
    Standard pagination class used by Project, Blog, Certificate, and Resource ViewSets.
    Supports ?page=X and ?page_size=Y parameters.
    """
    page_size = DEFAULT_PAGE_SIZE
    page_size_query_param = 'page_size'
    max_page_size = MAX_PAGE_SIZE

    def get_paginated_response(self, data):
        return Response({
            'success': True,
            'total_items': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        })