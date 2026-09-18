# Portfolio CMS & REST API Backend

Django REST Framework backend powering the modular portfolio website administration portal, secure JWT authentication, and 15 structured content management modules.

## Features

- **Modular Architecture**: 15 dedicated apps handling projects, skills, education, blogs, certificates, research, analytics, and settings.
- **Secure Authentication**: Django custom user model with SimpleJWT token authentication.
- **Admin CMS Overrides**: Modern professional theme customizer for Django admin dashboards.
- **Automated Telemetry**: Built-in page view tracking, device parsing, and analytics aggregators.
- **Comprehensive Test Suite**: Isolated test configuration across authentication, API endpoints, integration flows, and security hardening.

## Local Setup & Installation

1. Create and activate a Python virtual environment:
   ```cmd
   python -m venv venv
   venv\Scripts\activate