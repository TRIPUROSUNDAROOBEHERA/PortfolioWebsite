from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Course


class CourseAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.course1 = Course.objects.create(
            title="Data Structures & Algorithms",
            platform="Coursera",
            completion_date="May 2024",
            is_completed=True,
            is_featured=True,
            order=0
        )
        self.course2 = Course.objects.create(
            title="Web Development Bootcamp",
            platform="Udemy",
            completion_date="April 2024",
            is_completed=True,
            is_featured=True,
            order=1
        )
        self.list_url = reverse('course-list')
        self.featured_url = reverse('course-featured')

    def test_get_courses_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 2)

    def test_get_featured_courses(self):
        response = self.client.get(self.featured_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['title'], "Data Structures & Algorithms")
        self.assertEqual(response.data[0]['platform'], "Coursera")