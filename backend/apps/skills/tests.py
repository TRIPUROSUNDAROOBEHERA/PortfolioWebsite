from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import Skill, SkillCategory


class SkillAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.skill1 = Skill.objects.create(
            name="React.js",
            category=SkillCategory.FRONTEND,
            icon_name="SiReact",
            is_featured=True,
            order=0
        )
        self.skill2 = Skill.objects.create(
            name="Python",
            category=SkillCategory.BACKEND,
            icon_name="FaPython",
            is_featured=True,
            order=1
        )
        self.list_url = reverse('skill-list')
        self.featured_url = reverse('skill-featured')
        self.grouped_url = reverse('skill-grouped')

    def test_get_skills_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 2)

    def test_get_featured_skills(self):
        response = self.client.get(self.featured_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['name'], "React.js")

    def test_get_grouped_skills(self):
        response = self.client.get(self.grouped_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('frontend', response.data)
        self.assertEqual(response.data['frontend'][0]['name'], "React.js")