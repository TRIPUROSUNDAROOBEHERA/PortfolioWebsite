from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Education


class EducationAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.edu1 = Education.objects.create(
            degree="MCA",
            field_of_study="Master of Computer Applications",
            institution="University Name",
            start_year=2021,
            end_year=2023,
            score_display="CGPA: 8.7 / 10",
            icon=Education.IconChoice.GRADUATION_CAP,
            order=0,
            is_active=True
        )
        self.edu2 = Education.objects.create(
            degree="B.Sc (Science)",
            field_of_study="Bachelor of Science",
            institution="College Name",
            start_year=2018,
            end_year=2021,
            score_display="Percentage: 78.20%",
            icon=Education.IconChoice.FLASK,
            order=1,
            is_active=True
        )
        self.list_url = reverse('education-list')
        self.timeline_url = reverse('education-timeline')

    def test_get_education_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 2)

    def test_duration_property(self):
        self.assertEqual(self.edu1.duration, "2021 – 2023")

    def test_get_timeline_endpoint(self):
        response = self.client.get(self.timeline_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['degree'], "MCA")
        self.assertEqual(response.data[0]['score_display'], "CGPA: 8.7 / 10")