"""
Production settings with hardened security and database configuration.
"""
import os
import dj_database_url
from .base import *

# ==============================================================================
# 1. CORE PRODUCTION ENVIRONMENT & SECURITY
# ==============================================================================

DEBUG = os.getenv('DJANGO_DEBUG', 'False').lower() in ('true', '1', 't')

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', os.getenv('SECRET_KEY'))
if not SECRET_KEY:
    raise ValueError("DJANGO_SECRET_KEY environment variable must be set in production.")

# Parse ALLOWED_HOSTS from either DJANGO_ALLOWED_HOSTS or ALLOWED_HOSTS
raw_allowed_hosts = os.getenv('DJANGO_ALLOWED_HOSTS', os.getenv('ALLOWED_HOSTS', ''))
ALLOWED_HOSTS = [host.strip() for host in raw_allowed_hosts.split(',') if host.strip()]
if not ALLOWED_HOSTS:
    ALLOWED_HOSTS = ['*']


# ==============================================================================
# 2. PRODUCTION DATABASE (PostgreSQL)
# ==============================================================================

DATABASE_URL = os.getenv('DATABASE_URL')
DB_SSL_REQUIRE = os.getenv('DB_SSL_REQUIRE', 'False').lower() in ('true', '1', 't')
DB_SSLMODE = os.getenv('DB_SSLMODE', 'disable')

if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.parse(
            DATABASE_URL,
            conn_max_age=600,
            ssl_require=DB_SSL_REQUIRE,
        )
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv('DB_NAME', 'portfolio_db'),
            'USER': os.getenv('DB_USER', 'postgres'),
            'PASSWORD': os.getenv('DB_PASSWORD', 'portfolio_secret_password'),
            'HOST': os.getenv('DB_HOST', 'db'),
            'PORT': os.getenv('DB_PORT', '5432'),
            'CONN_MAX_AGE': 600,
            'OPTIONS': {
                'sslmode': DB_SSLMODE,
            },
        }
    }


# ==============================================================================
# 3. CORS & CSRF TRUSTED ORIGINS
# ==============================================================================

CORS_ALLOW_ALL_ORIGINS = os.getenv('CORS_ALLOW_ALL_ORIGINS', 'False').lower() in ('true', '1', 't')

raw_cors_origins = os.getenv(
    'CORS_ALLOWED_ORIGINS',
    'http://localhost,http://localhost:80,http://localhost:3000,http://localhost:5173'
)
CORS_ALLOWED_ORIGINS = [origin.strip() for origin in raw_cors_origins.split(',') if origin.strip()]
CORS_ALLOW_CREDENTIALS = True

# CSRF trusted origins for modern frontend-backend decoupling
CSRF_TRUSTED_ORIGINS = [
    f"https://{host}" if not host.startswith(('http://', 'https://')) else host
    for host in ALLOWED_HOSTS
    if host not in ('127.0.0.1', 'localhost', '*')
]


# ==============================================================================
# 4. HTTPS, SSL & BROWSER SECURITY PROTOCOLS
# ==============================================================================

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = os.getenv('SECURE_SSL_REDIRECT', 'False').lower() in ('true', '1', 't')

SESSION_COOKIE_SECURE = os.getenv('SESSION_COOKIE_SECURE', 'False').lower() in ('true', '1', 't')
CSRF_COOKIE_SECURE = os.getenv('CSRF_COOKIE_SECURE', 'False').lower() in ('true', '1', 't')
SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_HTTPONLY = False

SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# HTTP Strict Transport Security (HSTS)
if SECURE_SSL_REDIRECT:
    SECURE_HSTS_SECONDS = 31536000  # 1 year
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
else:
    SECURE_HSTS_SECONDS = 0


# ==============================================================================
# 5. PRODUCTION SMTP EMAIL DELIVERY
# ==============================================================================

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'True').lower() in ('true', '1', 't')
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', '')
DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL', f"Portfolio Administration <{EMAIL_HOST_USER}>")