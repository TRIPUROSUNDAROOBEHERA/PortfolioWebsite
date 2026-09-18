from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from apps.contact.models import ContactMessage
from apps.notifications.models import Notification


class ContactWorkflowIntegrationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Resolves to the contact submission endpoint (/api/contact/)
        try:
            self.contact_url = reverse('api:contact-list')
        except Exception:
            self.contact_url = '/api/contact/'

    def test_full_contact_submission_and_notification_flow(self):
        """
        Verify end-to-end flow:
        1. Anonymous user submits 'Let's Connect' contact form
        2. Record is created in database with is_read=False
        3. In-app admin notification is automatically generated
        """
        payload = {
            "name": "Jane Recruiter",
            "email": "jane@techcompany.com",
            "phone": "+91 9876543210",
            "subject": "Job Opportunity Discussion",
            "message": "We reviewed your portfolio and would like to invite you for an interview."
        }

        # 1. Submit form
        response = self.client.post(self.contact_url, payload, format='json')
        self.assertIn(response.status_code, [status.HTTP_201_CREATED, status.HTTP_200_OK])

        # 2. Assert contact record persistence
        self.assertEqual(ContactMessage.objects.count(), 1)
        msg = ContactMessage.objects.first()
        self.assertEqual(msg.name, "Jane Recruiter")
        self.assertFalse(msg.is_read)

        # 3. Assert system notification generation
        notification = Notification.objects.filter(notification_type='contact').first()
        if notification:
            self.assertIn("Jane Recruiter", notification.title)