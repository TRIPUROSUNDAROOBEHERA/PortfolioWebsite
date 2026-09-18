from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MediaAssetViewSet

router = DefaultRouter()
router.register(r'', MediaAssetViewSet, basename='media-asset')

urlpatterns = [
    path('', include(router.urls)),
]