from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .models import Profile
from .serializers import ProfileSerializer, ProfileSummarySerializer
from .permissions import IsAdminOrReadOnly
from .services import get_or_create_default_profile


class ProfileDetailView(APIView):
    """
    GET  /api/profile/ -> Public: Fetches full profile data
    PUT  /api/profile/ -> Admin: Updates full profile information
    PATCH /api/profile/ -> Admin: Partial updates (avatar, resume, stats)
    """
    permission_classes = [IsAdminOrReadOnly]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request):
        profile = get_or_create_default_profile()
        serializer = ProfileSerializer(profile, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        profile = get_or_create_default_profile()
        serializer = ProfileSerializer(profile, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        profile = get_or_create_default_profile()
        serializer = ProfileSerializer(profile, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileSummaryView(APIView):
    """
    GET /api/profile/summary/ -> Lightweight payload for TopBar and Footer
    """
    permission_classes = [IsAdminOrReadOnly]

    def get(self, request):
        profile = get_or_create_default_profile()
        serializer = ProfileSummarySerializer(profile, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)