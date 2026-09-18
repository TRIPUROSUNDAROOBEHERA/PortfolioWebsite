from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Resource, ResourceType


class ResourceAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.resource = Resource.objects.create(
            title="Notes & PDFs",
            resource_type=ResourceType.NOTES,
            external_url="https://example.com/notes.pdf",
            order=0,
            is_active=True
        )
        self.list_url = reverse('resource-list')
        self.download_url = reverse('resource-download', kwargs={'pk': self.resource.pk})

    def test_get_resources_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)

    def test_download_counter_increment(self):
        initial_downloads = self.resource.download_count
        response = self.client.post(self.download_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.resource.refresh_from_db()
        self.assertEqual(self.resource.download_count, initial_downloads + 1)