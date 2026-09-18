from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Profile


class ProfileAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.profile = Profile.objects.create(
            first_name="Test",
            last_name="Developer",
            email="test@gmail.com",
            badge_title="MCA Graduate"
        )
        self.url = reverse('profile_detail')

    def test_get_profile_public(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], "Test")
        self.assertEqual(response.data['full_name'], "Test Developer")