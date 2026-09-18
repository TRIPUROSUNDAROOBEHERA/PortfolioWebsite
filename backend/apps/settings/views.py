from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .models import SiteSetting
from .serializers import SiteSettingSerializer, PublicSiteSettingSerializer
from .permissions import IsAdminOrReadOnly
from .services import get_or_create_site_settings


class SiteSettingDetailView(APIView):
    """
    GET   /api/settings/ -> Full site configuration (Admin CMS view)
    PUT   /api/settings/ -> Update site settings (Admin only)
    PATCH /api/settings/ -> Partial settings update (Admin only)
    """
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request):
        settings_obj = get_or_create_site_settings()
        serializer = SiteSettingSerializer(settings_obj, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        settings_obj = get_or_create_site_settings()
        serializer = SiteSettingSerializer(settings_obj, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        settings_obj = get_or_create_site_settings()
        serializer = SiteSettingSerializer(settings_obj, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PublicSiteSettingView(APIView):
    """
    GET /api/settings/public/ -> Lightweight frontend configuration for Navbar, Footer, and Meta Tags
    """
    permission_classes = [IsAdminOrReadOnly]

    def get(self, request):
        settings_obj = get_or_create_site_settings()
        serializer = PublicSiteSettingSerializer(settings_obj, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class LegalDocumentView(APIView):
    """
    GET /api/settings/legal/ -> Fetches Privacy Policy and Terms & Conditions text
    """
    permission_classes = [IsAdminOrReadOnly]

    def get(self, request):
        settings_obj = get_or_create_site_settings()
        return Response({
            'privacy_policy': settings_obj.privacy_policy,
            'terms_conditions': settings_obj.terms_conditions,
        }, status=status.HTTP_200_OK)