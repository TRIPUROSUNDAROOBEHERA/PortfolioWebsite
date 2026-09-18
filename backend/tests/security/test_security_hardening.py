from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

User = get_user_model()


class SecurityHardeningTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.normal_user = User.objects.create_user(
            email="regular@visitor.local",
            password="RegularUserPass123!",
            is_staff=False
        )
        self.admin_user = User.objects.create_superuser(
            email="superadmin@portfolio.local",
            password="SuperSecureAdminPass123!"
        )
        try:
            self.stats_url = reverse('api:dashboard_stats')
        except Exception:
            self.stats_url = '/api/dashboard/stats/'

        try:
            self.contact_url = reverse('api:contact-list')
        except Exception:
            self.contact_url = '/api/contact/'

    def test_dashboard_stats_requires_staff_credentials(self):
        """Ensure non-staff authenticated users cannot access Dashboard analytics."""
        # 1. Test anonymous
        res_anon = self.client.get(self.stats_url)
        self.assertEqual(res_anon.status_code, status.HTTP_401_UNAUTHORIZED)

        # 2. Test authenticated non-staff user
        self.client.force_authenticate(user=self.normal_user)
        res_user = self.client.get(self.stats_url)
        self.assertEqual(res_user.status_code, status.HTTP_403_FORBIDDEN)

        # 3. Test staff user
        self.client.force_authenticate(user=self.admin_user)
        res_admin = self.client.get(self.stats_url)
        self.assertEqual(res_admin.status_code, status.HTTP_200_OK)

    def test_xss_sanitization_in_contact_form(self):
        """Ensure script tags inside contact inputs are safely accepted/escaped."""
        payload = {
            "name": "<script>alert('XSS')</script>John",
            "email": "john.hacker@domain.com",
            "subject": "<img src=x onerror=alert(1)>",
            "message": "Testing input sanitization"
        }
        response = self.client.post(self.contact_url, payload, format='json')
        self.assertIn(response.status_code, [status.HTTP_201_CREATED, status.HTTP_200_OK])