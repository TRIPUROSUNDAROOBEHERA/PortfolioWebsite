"""
Testing settings configured for fast, isolated test suite runs.
"""
from .base import *

DEBUG = False
SECRET_KEY = 'django-insecure-test-environment-key-do-not-use-in-prod'
ALLOWED_HOSTS = ['*']

# In-memory SQLite for high-speed test execution
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': ':memory:',
    }
}

# Fast password hashing to accelerate user creation in tests
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.MD5PasswordHasher',
]

# Prevent outbound emails during test runs
EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'

# In-memory cache for test isolation
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
    }
}

# Silence console logging output during automated tests
LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'handlers': {
        'null': {
            'class': 'logging.NullHandler',
        },
    },
    'root': {
        'handlers': ['null'],
        'level': 'CRITICAL',
    },
}