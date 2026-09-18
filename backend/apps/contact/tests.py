from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient
from .models import ContactMessage

User = get_user_model()


class ContactAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.contact_url = reverse('contact-message-list')
        self.admin_user = User.objects.create_superuser(
            email='admin@test.com',
            password='Password123!'
        )

    def test_public_can_submit_contact_message(self):
        payload = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "subject": "Project Discussion",
            "message": "Hello, I would like to discuss a potential full-stack project."
        }
        response = self.client.post(self.contact_url, data=payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)
        self.assertEqual(ContactMessage.objects.first().name, "Jane Doe")

    def test_public_cannot_view_messages_list(self):
        response = self.client.get(self.contact_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_admin_can_view_messages_list(self):
        ContactMessage.objects.create(
            name="Alice",
            email="alice@example.com",
            message="Test inquiry message content."
        )
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(self.contact_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)