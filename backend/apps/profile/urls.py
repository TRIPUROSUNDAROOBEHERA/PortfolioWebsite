from django.urls import path
from .views import ProfileDetailView, ProfileSummaryView

urlpatterns = [
    path('', ProfileDetailView.as_view(), name='profile_detail'),
    path('summary/', ProfileSummaryView.as_view(), name='profile_summary'),
]