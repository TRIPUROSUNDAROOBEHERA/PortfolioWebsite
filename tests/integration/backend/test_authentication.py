### Backend Integration Suite (`tests/integration/backend/`)

#### `tests/integration/backend/test_authentication.py`
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()


class AuthenticationIntegrationTests(APITestCase):

    def setUp(self):
        self.username = "testadmin"
        self.password = "SecurePass123!"
        self.user = User.objects.create_user(
            username=self.username,
            email="admin@example.com",
            password=self.password,
        )
        self.token_url = "/api/auth/token/"
        self.refresh_url = "/api/auth/token/refresh/"

    def test_obtain_jwt_token_pair_success(self):
        payload = {"username": self.username, "password": self.password}
        response = self.client.post(self.token_url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_obtain_jwt_token_invalid_credentials(self):
        payload = {"username": self.username, "password": "WrongPassword"}
        response = self.client.post(self.token_url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_refresh_jwt_token_flow(self):
        payload = {"username": self.username, "password": self.password}
        login_res = self.client.post(self.token_url, payload, format="json")
        refresh_token = login_res.data["refresh"]

        refresh_res = self.client.post(
            self.refresh_url, {"refresh": refresh_token}, format="json"
        )
        self.assertEqual(refresh_res.status_code, status.HTTP_200_OK)
        self.assertIn("access", refresh_res.data)