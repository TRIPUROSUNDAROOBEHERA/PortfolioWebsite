from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient
from .models import Notification, NotificationType, NotificationLevel

User = get_user_model()


class NotificationAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(
            email='admin@test.com',
            password='AdminPassword123!'
        )
        self.notification = Notification.objects.create(
            title="New message received",
            message="You have a new inquiry from Let's Connect.",
            notification_type=NotificationType.CONTACT_MESSAGE,
            level=NotificationLevel.INFO,
            is_read=False
        )
        self.list_url = reverse('notification-list')
        self.unread_count_url = reverse('notification-unread-count')
        self.mark_all_read_url = reverse('notification-mark-all-read')

    def test_anonymous_cannot_access_notifications(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_admin_get_notifications_list(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)

    def test_get_unread_count(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(self.unread_count_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['unread_count'], 1)

    def test_mark_all_read_action(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.post(self.mark_all_read_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.notification.refresh_from_db()
        self.assertTrue(self.notification.is_read)