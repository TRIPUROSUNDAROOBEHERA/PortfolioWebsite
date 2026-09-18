from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Achievement


class AchievementAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.item1 = Achievement.objects.create(
            title="College Topper - MCA (2023)",
            description="Awarded for academic excellence",
            icon_style=Achievement.IconStyle.MEDAL,
            is_featured=True,
            order=0
        )
        self.item2 = Achievement.objects.create(
            title="Hackathon Winner",
            description="Smart India Hackathon 2023",
            icon_style=Achievement.IconStyle.TROPHY,
            is_featured=True,
            order=1
        )
        self.list_url = reverse('achievement-list')
        self.featured_url = reverse('achievement-featured')

    def test_get_achievements_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 2)

    def test_get_featured_achievements(self):
        response = self.client.get(self.featured_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['title'], "College Topper - MCA (2023)")