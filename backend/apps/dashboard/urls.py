from django.urls import path
from .views import (
    health_check,
    DashboardOverviewView,
    DashboardAnalyticsView,
    TrackVisitView,
)

urlpatterns = [
    path('health/', health_check, name='dashboard_health'),
    path('stats/', DashboardOverviewView.as_view(), name='dashboard_stats'),
    path('analytics/', DashboardAnalyticsView.as_view(), name='dashboard_analytics'),
    path('track/', TrackVisitView.as_view(), name='dashboard_track_visit'),
]