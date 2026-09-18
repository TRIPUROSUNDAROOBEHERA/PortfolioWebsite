from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import ResearchPaper, ResearchStatus


class ResearchAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.paper = ResearchPaper.objects.create(
            title="Optimizing High-Performance Web Architectures",
            field_of_study="Full-Stack Systems",
            abstract="Study on latency optimization in distributed web services.",
            status=ResearchStatus.COMPLETED,
            authors="Your Name",
            is_featured=True,
            order=0
        )
        self.list_url = reverse('research-list')
        self.featured_url = reverse('research-featured')

    def test_get_research_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)

    def test_get_featured_research(self):
        response = self.client.get(self.featured_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['title'], "Optimizing High-Performance Web Architectures")