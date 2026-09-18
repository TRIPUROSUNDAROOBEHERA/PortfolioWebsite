from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Project, ProjectCategory


class ProjectAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.project = Project.objects.create(
            title="Portfolio Website",
            category=ProjectCategory.FULL_STACK,
            description="Personal portfolio website to showcase skills and projects.",
            technologies="React, Tailwind CSS, Vite",
            is_featured=True,
            order=0
        )
        self.list_url = reverse('project-list')
        self.featured_url = reverse('project-featured')

    def test_get_projects_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data.get('results', response.data)), 1)

    def test_tech_list_property(self):
        self.assertEqual(self.project.tech_list, ['React', 'Tailwind CSS', 'Vite'])

    def test_get_featured_projects(self):
        response = self.client.get(self.featured_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['title'], "Portfolio Website")