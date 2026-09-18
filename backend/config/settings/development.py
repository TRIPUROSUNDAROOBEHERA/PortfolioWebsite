"""
Development settings for local testing and rapid prototyping.
"""
from .base import *

# ==============================================================================
# 1. CORE DEBUG & HOSTS
# ==============================================================================

DEBUG = True

ALLOWED_HOSTS = ['*']


# ==============================================================================
# 2. LOCAL DATABASE (SQLite3)
# ==============================================================================

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# ==============================================================================
# 3. LOCAL CORS & SECURITY RELAXATION
# ==============================================================================

# Permissive CORS configuration for React dev servers (Vite/CRA)
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# Disable strict password validation rules during development
AUTH_PASSWORD_VALIDATORS = []

# Disable SSL redirects and secure cookies for local HTTP development
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False


# ==============================================================================
# 4. EMAIL BACKEND (Console output for local testing)
# ==============================================================================

# Prints sent emails directly into the terminal console instead of sending via SMTP
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'