from django.test import TestCase
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient
from .models import MediaAsset, MediaFolderCategory

User = get_user_model()


class MediaAssetAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(
            email='admin@test.com',
            password='AdminPassword123!'
        )
        self.dummy_file = SimpleUploadedFile(
            "test_image.png",
            b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR",
            content_type="image/png"
        )
        self.asset = MediaAsset.objects.create(
            title="Sample Preview",
            file=self.dummy_file,
            folder_category=MediaFolderCategory.PROJECTS
        )
        self.list_url = reverse('media-asset-list')
        self.stats_url = reverse('media-asset-stats')

    def test_get_media_list_public(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)

    def test_upload_media_admin(self):
        self.client.force_authenticate(user=self.admin_user)
        new_file = SimpleUploadedFile("avatar.jpg", b"fakeimagecontent", content_type="image/jpeg")
        payload = {
            'title': 'New Avatar',
            'folder_category': MediaFolderCategory.AVATARS,
            'file': new_file
        }
        response = self.client.post(self.list_url, data=payload, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_media_stats(self):
        response = self.client.get(self.stats_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('total_files', response.data)
        self.assertIn('total_size_mb', response.data)