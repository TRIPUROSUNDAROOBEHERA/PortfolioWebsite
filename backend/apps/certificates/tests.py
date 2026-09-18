from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Certificate


class CertificateAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.cert1 = Certificate.objects.create(
            title="React - Complete Guide",
            issuer="Udemy",
            issue_date="June 2024",
            is_featured=True,
            order=0
        )
        self.cert2 = Certificate.objects.create(
            title="JavaScript Algorithms",
            issuer="freeCodeCamp",
            issue_date="May 2024",
            is_featured=True,
            order=1
        )
        self.list_url = reverse('certificate-list')
        self.featured_url = reverse('certificate-featured')

    def test_get_certificates_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 2)

    def test_subtitle_property(self):
        self.assertEqual(self.cert1.subtitle, "Udemy | June 2024")

    def test_get_featured_certificates(self):
        response = self.client.get(self.featured_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['title'], "React - Complete Guide")
        self.assertEqual(response.data[0]['subtitle'], "Udemy | June 2024")