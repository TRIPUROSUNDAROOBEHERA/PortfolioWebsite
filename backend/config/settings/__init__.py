import os
from dotenv import load_dotenv

load_dotenv()

# Default to development settings if DJANGO_SETTINGS_MODULE is not specified
environment = os.getenv('DJANGO_ENV', 'development')

if environment == 'production':
    from .production import *
elif environment == 'testing':
    from .testing import *
else:
    from .development import *