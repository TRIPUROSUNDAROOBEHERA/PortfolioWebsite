from datetime import date
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Publication, PublicationType


class PublicationAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.pub = Publication.objects.create(
            title="Design and Scalability Analysis of Full-Stack Cloud Portals",
            publication_type=PublicationType.CONFERENCE,
            authors="Your Name",
            journal_or_conference="International Conference on Software Engineering",
            abstract="Comparative analysis of API latency and reactive frontend caching models.",
            published_date=date(2024, 5, 1),
            is_featured=True,
            order=0
        )
        self.list_url = reverse('publication-list')
        self.featured_url = reverse('publication-featured')

    def test_get_publications_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)

    def test_get_featured_publications(self):
        response = self.client.get(self.featured_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['title'], "Design and Scalability Analysis of Full-Stack Cloud Portals")