from django.test import TestCase, RequestFactory
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient
from .models import AuditLog, ActionType
from .services import log_action

User = get_user_model()


class AuditLogAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.factory = RequestFactory()
        self.admin_user = User.objects.create_superuser(
            email='admin@test.com',
            password='AdminPassword123!'
        )
        self.log_entry = AuditLog.objects.create(
            user=self.admin_user,
            user_email=self.admin_user.email,
            action=ActionType.CREATE,
            module="Projects",
            description="Created Portfolio Website project record."
        )
        self.list_url = reverse('audit-log-list')
        self.recent_url = reverse('audit-log-recent')

    def test_anonymous_cannot_view_audit_logs(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_admin_can_view_audit_logs(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        results = response.data.get('results', response.data)
        self.assertEqual(len(results), 1)

    def test_log_action_service_helper(self):
        request = self.factory.get('/')
        request.user = self.admin_user
        log_action(request, ActionType.UPDATE, "Profile", "Updated headline and bio.")
        self.assertEqual(AuditLog.objects.count(), 2)