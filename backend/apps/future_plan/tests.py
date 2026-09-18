from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import FuturePlan, FuturePlanCategory


class FuturePlanAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.plan1 = FuturePlan.objects.create(
            title="Add New Courses & Lessons",
            category=FuturePlanCategory.COURSE,
            status=FuturePlan.Status.PLANNED,
            order=0,
            is_active=True
        )
        self.plan2 = FuturePlan.objects.create(
            title="Upload New Certificates",
            category=FuturePlanCategory.CERTIFICATION,
            status=FuturePlan.Status.PLANNED,
            order=1,
            is_active=True
        )
        self.list_url = reverse('future-plan-list')
        self.active_url = reverse('future-plan-active')

    def test_get_plans_list(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 2)

    def test_get_active_plans(self):
        response = self.client.get(self.active_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['title'], "Add New Courses & Lessons")
        self.assertEqual(response.data[1]['title'], "Upload New Certificates")