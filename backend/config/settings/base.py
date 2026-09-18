import os
import sys
from pathlib import Path
from datetime import timedelta
import dj_database_url
from dotenv import load_dotenv

# ==============================================================================
# 1. BASE DIRECTORIES & ENVIRONMENT VARIABLES
# ==============================================================================

# Resolves from 'backend/config/settings/base.py' up 3 levels to 'backend/'
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Load environment variables from backend/.env
load_dotenv(os.path.join(BASE_DIR, '.env'))

# Add 'apps' folder to Python path for direct modular imports
sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))


# ==============================================================================
# 2. CORE SECURITY & ENVIRONMENT
# ==============================================================================

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', os.getenv('SECRET_KEY', 'django-insecure-portfolio-cms-key-replace-in-prod'))
DEBUG = os.getenv('DJANGO_DEBUG', os.getenv('DEBUG', 'True')) == 'True'

ALLOWED_HOSTS = [
    host.strip()
    for host in os.getenv('DJANGO_ALLOWED_HOSTS', os.getenv('ALLOWED_HOSTS', '127.0.0.1,localhost,0.0.0.0')).split(',')
    if host.strip()
]


# ==============================================================================
# 3. APPLICATION DEFINITIONS (All 18 Modular Apps + Common)
# ==============================================================================

DJANGO_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

THIRD_PARTY_APPS = [
    'corsheaders',  # Must be loaded before REST framework
    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'django_filters',
]

LOCAL_APPS = [
    'apps.accounts.apps.AccountsConfig',
    'apps.profile.apps.ProfileConfig',
    'apps.education.apps.EducationConfig',
    'apps.skills.apps.SkillsConfig',
    'apps.projects.apps.ProjectsConfig',
    'apps.certificates.apps.CertificatesConfig',
    'apps.achievements.apps.AchievementsConfig',
    'apps.courses.apps.CoursesConfig',
    'apps.blogs.apps.BlogsConfig',
    'apps.future_plan.apps.FuturePlanConfig',
    'apps.research.apps.ResearchConfig',
    'apps.publications.apps.PublicationsConfig',
    'apps.resources.apps.ResourcesConfig',
    'apps.contact.apps.ContactConfig',
    'apps.media_manager.apps.MediaManagerConfig',
    'apps.notifications.apps.NotificationsConfig',
    'apps.audit_logs.apps.AuditLogsConfig',
    'apps.settings.apps.SettingsConfig',
    'apps.dashboard.apps.DashboardConfig',
    'common',
]

INSTALLED_APPS = ['corsheaders'] + DJANGO_APPS + [app for app in THIRD_PARTY_APPS if app != 'corsheaders'] + LOCAL_APPS

# Custom User Model
AUTH_USER_MODEL = 'accounts.User'


# ==============================================================================
# 4. AUTHENTICATION ROUTING & REDIRECTS
# ==============================================================================

LOGIN_URL = '/admin/login/'
LOGIN_REDIRECT_URL = '/admin/'
LOGOUT_REDIRECT_URL = '/admin/login/'


# ==============================================================================
# 5. MIDDLEWARE PIPELINE (CorsMiddleware must be first)
# ==============================================================================

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'


# ==============================================================================
# 6. TEMPLATES CONFIGURATION
# ==============================================================================

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


# ==============================================================================
# 7. WSGI & ASGI
# ==============================================================================

WSGI_APPLICATION = 'config.wsgi.application'
ASGI_APPLICATION = 'config.asgi.application'


# ==============================================================================
# 8. HYBRID DATABASE CONFIGURATION (SQLite / PostgreSQL / MySQL)
# ==============================================================================

DATABASE_URL = os.getenv('DATABASE_URL')

if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
            ssl_require=False
        )
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }


# ==============================================================================
# 9. PASSWORD VALIDATORS
# ==============================================================================

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# ==============================================================================
# 10. INTERNATIONALIZATION & TIMEZONE
# ==============================================================================

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True


# ==============================================================================
# 11. STATIC & MEDIA ASSETS CONFIGURATION
# ==============================================================================

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')] if os.path.exists(os.path.join(BASE_DIR, 'static')) else []

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

os.makedirs(STATIC_ROOT, exist_ok=True)
os.makedirs(MEDIA_ROOT, exist_ok=True)

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# ==============================================================================
# 12. CORS CONFIGURATION (Frontend Dev Ports: 5173, 5174, 3000)
# ==============================================================================

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

cors_env = os.getenv('CORS_ALLOWED_ORIGINS')
if cors_env:
    CORS_ALLOWED_ORIGINS.extend([origin.strip() for origin in cors_env.split(',') if origin.strip()])

# Allow all origins during local debugging if needed
if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]


# ==============================================================================
# 13. DJANGO REST FRAMEWORK (DRF) & SIMPLE JWT CONFIGURATION
# ==============================================================================

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
    'DEFAULT_FILTER_BACKENDS': (
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ),
    'DEFAULT_PAGINATION_CLASS': 'common.pagination.StandardResultsSetPagination',
    'PAGE_SIZE': 10,
    'EXCEPTION_HANDLER': 'common.exceptions.custom_exception_handler',
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}


# ==============================================================================
# 14. EMAIL CONFIGURATION (Gmail SMTP)
# ==============================================================================


EMAIL_BACKEND = os.getenv(
    'EMAIL_BACKEND',
    'django.core.mail.backends.smtp.EmailBackend'
)
EMAIL_HOST = os.getenv('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'True').lower() in ('true', '1', 't')
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', 'sramkumar0101@gmail.com')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', '')
DEFAULT_FROM_EMAIL = os.getenv(
    'DEFAULT_FROM_EMAIL',
    f"Portfolio Administration <{EMAIL_HOST_USER}>"
)
SERVER_EMAIL = os.getenv('SERVER_EMAIL', EMAIL_HOST_USER)

# Set timeout to prevent page hangs if Google takes time to respond
EMAIL_TIMEOUT = 10


# ==============================================================================
# 15. SYSTEM LOGGING CONFIGURATION
# ==============================================================================

LOGS_DIR = os.path.join(BASE_DIR, 'logs')
os.makedirs(LOGS_DIR, exist_ok=True)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '[{asctime}] {levelname} [{name}:{lineno}] {message}',
            'style': '{',
            'datefmt': '%Y-%m-%d %H:%M:%S',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
        'file': {
            'level': 'WARNING',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(LOGS_DIR, 'django.log'),
            'maxBytes': 1024 * 1024 * 5,
            'backupCount': 5,
            'formatter': 'verbose',
            'encoding': 'utf-8',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': True,
        },
        'django.request': {
            'handlers': ['file', 'console'],
            'level': 'ERROR',
            'propagate': False,
        },
        'apps': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}


# ==============================================================================
# 16. PRODUCTION SECURITY PROTOCOLS (Activated when DEBUG=False)
# ==============================================================================

if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True