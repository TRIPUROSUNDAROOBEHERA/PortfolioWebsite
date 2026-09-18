from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient
from .models import PageView
from .analytics import parse_device_type, parse_browser

User = get_user_model()


class DashboardAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(
            email='admin@test.com',
            password='AdminPassword123!'
        )
        self.stats_url = reverse('dashboard_stats')
        self.analytics_url = reverse('dashboard_analytics')
        self.track_url = reverse('dashboard_track_visit')

    def test_anonymous_cannot_access_stats(self):
        response = self.client.get(self.stats_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_admin_can_access_dashboard_stats(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(self.stats_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('projects', response.data)
        self.assertIn('skills', response.data)
        self.assertIn('future_plans', response.data)
        self.assertIn('messages', response.data)

    def test_public_track_visit_endpoint(self):
        payload = {
            'path': '/projects',
            'referrer': 'https://google.com'
        }
        response = self.client.post(self.track_url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PageView.objects.count(), 1)
        self.assertEqual(PageView.objects.first().path, '/projects')

    def test_analytics_parsers(self):
        mobile_ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15"
        desktop_chrome_ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"

        self.assertEqual(parse_device_type(mobile_ua), "Mobile")
        self.assertEqual(parse_device_type(desktop_chrome_ua), "Desktop")
        self.assertEqual(parse_browser(desktop_chrome_ua), "Chrome")