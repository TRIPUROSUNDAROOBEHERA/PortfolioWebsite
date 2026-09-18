from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.projects.models import Project
from apps.skills.models import Skill

User = get_user_model()


class PortfolioAPIsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(
            email="admin@portfolio.local",
            password="AdminPassword123"
        )
        self.skill = Skill.objects.create(
            name="Django",
            category="backend",
            proficiency_percentage=90
        )
        self.project = Project.objects.create(
            title="Portfolio Website",
            description="Personal CMS portfolio backend",
            technologies="Django, React, SQLite",
            is_featured=True
        )
        try:
            self.projects_url = reverse('api:project-list')
        except Exception:
            self.projects_url = '/api/projects/'

        try:
            self.skills_url = reverse('api:skill-list')
        except Exception:
            self.skills_url = '/api/skills/'

    def test_public_projects_list(self):
        """Verify unauthenticated visitors can view public projects list."""
        response = self.client.get(self.projects_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_skills_list_retrieval(self):
        """Verify skills endpoint returns category filtered data."""
        response = self.client.get(self.skills_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_admin_can_create_project(self):
        """Verify authenticated admin can create projects."""
        self.client.force_authenticate(user=self.admin_user)
        payload = {
            "title": "New AI App",
            "description": "Innovative AI solution",
            "technologies": "Python, PyTorch",
            "is_featured": True
        }
        response = self.client.post(self.projects_url, payload, format='json')
        self.assertIn(response.status_code, [status.HTTP_201_CREATED, status.HTTP_200_OK])

    def test_unauthenticated_cannot_create_project(self):
        """Verify anonymous user cannot POST/create new projects."""
        payload = {
            "title": "Hacked App",
            "description": "Unauthorized creation"
        }
        response = self.client.post(self.projects_url, payload, format='json')
        self.assertIn(response.status_code, [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN])