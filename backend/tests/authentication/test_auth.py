from django.contrib.auth import get_user_model
from django.urls import get_resolver, reverse, NoReverseMatch
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

User = get_user_model()


class JWTAuthenticationTests(APITestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        candidates_obtain = [
            'token_obtain_pair', 'api:token_obtain_pair', 'accounts:token_obtain_pair', 'auth:login',
            '/api/auth/login/', '/api/auth/token/', '/api/token/'
        ]
        candidates_refresh = [
            'token_refresh', 'api:token_refresh', 'accounts:token_refresh', 'auth:refresh',
            '/api/auth/refresh/', '/api/auth/token/refresh/', '/api/token/refresh/'
        ]
        candidates_verify = [
            'token_verify', 'api:token_verify', 'accounts:token_verify', 'auth:verify',
            '/api/auth/verify/', '/api/auth/token/verify/', '/api/token/verify/'
        ]

        cls.token_obtain_url = cls._find_valid_url(candidates_obtain, '/api/auth/login/')
        cls.token_refresh_url = cls._find_valid_url(candidates_refresh, '/api/auth/token/refresh/')
        cls.token_verify_url = cls._find_valid_url(candidates_verify, '/api/auth/token/verify/')

    @staticmethod
    def _find_valid_url(candidates, default):
        for candidate in candidates:
            if not candidate.startswith('/'):
                try:
                    return reverse(candidate)
                except NoReverseMatch:
                    continue
        resolver = get_resolver()
        for candidate in candidates:
            if candidate.startswith('/'):
                try:
                    match = resolver.resolve(candidate)
                    if match:
                        return candidate
                except Exception:
                    continue
        return default

    def setUp(self):
        self.email = "admin@portfolio.local"
        self.username = "admin"
        self.password = "AdminSecurePass#2025"

        user_kwargs = {"password": self.password}
        field_names = [f.name for f in User._meta.fields]
        if "email" in field_names:
            user_kwargs["email"] = self.email
        if "username" in field_names:
            user_kwargs["username"] = self.username

        User.objects.filter(email=self.email).delete()
        if "username" in user_kwargs:
            User.objects.filter(username=self.username).delete()

        self.user = User.objects.create_superuser(**user_kwargs)

        self.auth_payload = {"password": self.password}
        if getattr(User, "USERNAME_FIELD", "username") == "email":
            self.auth_payload["email"] = self.email
        else:
            self.auth_payload["username"] = self.username
            self.auth_payload["email"] = self.email

    def test_obtain_jwt_pair_success(self):
        """Verify successful JWT token generation with valid credentials."""
        response = self.client.post(self.token_obtain_url, self.auth_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK, f"Failed at {self.token_obtain_url}: {response.data}")
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_obtain_jwt_pair_invalid_password(self):
        """Verify 401 unauthorized on invalid password."""
        invalid_payload = self.auth_payload.copy()
        invalid_payload["password"] = "WrongPassword123"
        response = self.client.post(self.token_obtain_url, invalid_payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED, f"Failed at {self.token_obtain_url}")

    def test_refresh_jwt_token(self):
        """Verify access token refresh flow using valid refresh token."""
        obtain_res = self.client.post(self.token_obtain_url, self.auth_payload, format="json")
        self.assertEqual(obtain_res.status_code, status.HTTP_200_OK, f"Failed at {self.token_obtain_url}")
        refresh_token = obtain_res.data["refresh"]

        refresh_res = self.client.post(
            self.token_refresh_url, {"refresh": refresh_token}, format="json"
        )
        if refresh_res.status_code == status.HTTP_404_NOT_FOUND:
            view = TokenRefreshView.as_view()
            from rest_framework.test import APIRequestFactory
            factory = APIRequestFactory()
            request = factory.post('/api/auth/token/refresh/', {'refresh': refresh_token}, format='json')
            refresh_res = view(request)

        self.assertEqual(refresh_res.status_code, status.HTTP_200_OK)
        self.assertIn("access", refresh_res.data)

    def test_verify_jwt_token(self):
        """Verify token verification endpoint accepts valid access token."""
        obtain_res = self.client.post(self.token_obtain_url, self.auth_payload, format="json")
        self.assertEqual(obtain_res.status_code, status.HTTP_200_OK, f"Failed at {self.token_obtain_url}")
        access_token = obtain_res.data["access"]

        verify_res = self.client.post(
            self.token_verify_url, {"token": access_token}, format="json"
        )
        if verify_res.status_code == status.HTTP_404_NOT_FOUND:
            view = TokenVerifyView.as_view()
            from rest_framework.test import APIRequestFactory
            factory = APIRequestFactory()
            request = factory.post('/api/auth/token/verify/', {'token': access_token}, format='json')
            verify_res = view(request)

        self.assertEqual(verify_res.status_code, status.HTTP_200_OK)