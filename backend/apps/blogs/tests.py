from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import BlogPost, BlogCategory


class BlogAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = BlogCategory.objects.create(name="AI & Tech")
        self.post = BlogPost.objects.create(
            title="Future of AI in Education",
            category=self.category,
            summary="An overview of AI tools in modern universities.",
            content="This is the full markdown content exploring artificial intelligence.",
            is_published=True,
            is_featured=True
        )
        self.list_url = reverse('blog-post-list')
        self.detail_url = reverse('blog-post-detail', kwargs={'slug': self.post.slug})
        self.latest_url = reverse('blog-post-latest')

    def test_get_blogs_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_single_blog_increments_views(self):
        initial_views = self.post.views_count
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.post.refresh_from_db()
        self.assertEqual(self.post.views_count, initial_views + 1)

    def test_get_latest_blogs(self):
        response = self.client.get(self.latest_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['title'], "Future of AI in Education")