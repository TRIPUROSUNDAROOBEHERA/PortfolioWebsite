from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.projects.models import Project
from apps.skills.models import Skill
from apps.blogs.models import BlogPost


class PublicAPIIntegrationTests(APITestCase):

    def setUp(self):
        self.skill = Skill.objects.create(
            name="Django", category="backend", proficiency=90
        )
        self.project = Project.objects.create(
            title="Portfolio Project",
            slug="portfolio-project",
            description="Integration test project",
            featured=True,
        )
        self.blog = BlogPost.objects.create(
            title="Docker Postgres Integration",
            slug="docker-postgres-integration",
            content="Detailed guide on multi-container testing.",
        )

    def test_get_projects_list(self):
        response = self.client.get("/api/projects/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_get_skills_list(self):
        response = self.client.get("/api/skills/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(
            any(item["name"] == "Django" for item in response.data)
        )

    def test_submit_contact_inquiry(self):
        payload = {
            "name": "Integration Tester",
            "email": "tester@example.com",
            "subject": "Inquiry Subject",
            "message": "Testing automated email/inquiry capture.",
        }
        response = self.client.post("/api/contact/", payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)