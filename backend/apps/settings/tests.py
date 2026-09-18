from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient
from .models import SiteSetting

User = get_user_model()


class SiteSettingAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.settings_obj = SiteSetting.objects.create(
            site_name="My Developer Portfolio",
            logo_initials="AS",
            footer_copyright="© 2025 Your Name. All rights reserved.",
            enable_contact_form=True
        )
        self.public_url = reverse('public_site_settings')
        self.detail_url = reverse('site_settings_detail')
        self.admin_user = User.objects.create_superuser(
            email='admin@test.com',
            password='AdminPassword123!'
        )

    def test_get_public_settings(self):
        response = self.client.get(self.public_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['site_name'], "My Developer Portfolio")
        self.assertEqual(response.data['logo_initials'], "AS")

    def test_update_settings_admin(self):
        self.client.force_authenticate(user=self.admin_user)
        payload = {
            'site_name': 'Updated Portfolio Title',
            'logo_initials': 'YN'
        }
        response = self.client.patch(self.detail_url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.settings_obj.refresh_from_db()
        self.assertEqual(self.settings_obj.site_name, 'Updated Portfolio Title')
        self.assertEqual(self.settings_obj.logo_initials, 'YN')