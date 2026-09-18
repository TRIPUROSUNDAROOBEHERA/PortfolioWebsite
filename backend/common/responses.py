from rest_framework.response import Response
from rest_framework import status
from .constants import MSG_SUCCESS


class APIResponse:
    """Standardized API response generator across all view methods."""

    @staticmethod
    def success(data=None, message=MSG_SUCCESS, status_code=status.HTTP_200_OK, **kwargs):
        payload = {
            'success': True,
            'message': message,
            'data': data,
        }
        payload.update(kwargs)
        return Response(payload, status=status_code)

    @staticmethod
    def error(error="An error occurred", status_code=status.HTTP_400_BAD_REQUEST, **kwargs):
        payload = {
            'success': False,
            'error': error,
            'status_code': status_code,
        }
        payload.update(kwargs)
        return Response(payload, status=status_code)