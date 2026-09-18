---

### **3. `docs/architecture/backend-architecture.md`**
```markdown
# ⚙️ Backend Architecture

The backend is built with **Python** and **Django REST Framework (DRF)**, structured around a modular, domain-driven design.

---

## 📂 Backend Architecture

```text
backend/
├── apps/               # Isolated domain-specific modules
│   ├── accounts/       # Custom User model and authentication
│   ├── profile/        # Personal bio, metrics, and resume info
│   ├── projects/       # Portfolio project records and tech stack tags
│   ├── skills/         # Skill categories and proficiency levels
│   ├── experience/     # Work experience and career timeline
│   ├── education/      # Academic degrees and coursework
│   ├── certificates/   # Certifications, issuing authorities, and credentials
│   ├── blogs/          # Markdown-ready articles, comments, and tags
│   ├── testimonials/   # Client feedback and peer endorsements
│   ├── contact/        # Contact form submission and inbox manager
│   └── dashboard/      # Metrics aggregator and activity logs
├── config/             # Root settings, WSGI/ASGI, and URL routing
├── services/           # Reusable service layer (Email, Storage, Notifications)
├── static/             # Custom static CSS, JavaScript, and branding
├── templates/          # HTML templates for admin & email dispatches
└── logs/               # Rotating file logs