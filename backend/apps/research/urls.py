from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ResearchPaperViewSet

router = DefaultRouter()
router.register(r'', ResearchPaperViewSet, basename='research')

urlpatterns = [
    path('', include(router.urls)),
]