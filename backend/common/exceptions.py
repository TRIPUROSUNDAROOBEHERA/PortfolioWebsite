import logging
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError as DjangoValidationError
from django.http import Http404

logger = logging.getLogger('common')


def custom_exception_handler(exc, context):
    """
    Unified JSON error response interceptor for all API endpoints.
    Standardizes error outputs to format:
    {
        "success": False,
        "error": "Error message / object",
        "status_code": 4xx/5xx
    }
    """
    response = exception_handler(exc, context)

    # Convert Django standard ValidationError to DRF 400 response
    if isinstance(exc, DjangoValidationError):
        return Response({
            'success': False,
            'error': exc.message_dict if hasattr(exc, 'message_dict') else exc.messages,
            'status_code': status.HTTP_400_BAD_REQUEST
        }, status=status.HTTP_400_BAD_REQUEST)

    # Convert Django Http404 to DRF 404 response
    if isinstance(exc, Http404):
        return Response({
            'success': False,
            'error': 'Resource not found.',
            'status_code': status.HTTP_404_NOT_FOUND
        }, status=status.HTTP_404_NOT_FOUND)

    # DRF handled exceptions
    if response is not None:
        custom_data = {
            'success': False,
            'error': response.data,
            'status_code': response.status_code
        }
        response.data = custom_data
        return response

    # Unhandled 500 server errors
    view_name = context.get('view').__class__.__name__ if context.get('view') else 'Unknown'
    logger.error(f"Unhandled Exception in {view_name}: {str(exc)}", exc_info=True)

    return Response({
        'success': False,
        'error': 'An unexpected internal server error occurred.',
        'status_code': status.HTTP_500_INTERNAL_SERVER_ERROR
    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)