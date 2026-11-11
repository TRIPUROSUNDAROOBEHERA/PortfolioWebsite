import os
import sys
import django

# Setup Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.projects.models import Project, ProjectCategory
from apps.skills.models import Skill, SkillCategory
from apps.certificates.models import Certificate
from apps.education.models import Education
from apps.profile.models import Profile

def seed_data():
    print("--- Seeding Portfolio Data ---")

    # 1. Seed Education (MCA as top priority)
    education_records = [
        {
            "degree": "MCA",
            "field_of_study": "Master of Computer Applications",
            "institution": "Sree Venkateswara College of Engineering, Nellore\nJawaharlal Nehru Technological University Anantapur (JNTUA)",
            "start_year": 2024,
            "end_year": 2026,
            "score_display": "CGPA: 8.47 / 10.0",
            "icon": Education.IconChoice.GRADUATION_CAP,
            "order": 0,
        },
        {
            "degree": "B.Sc (Science)",
            "field_of_study": "Computer Science & Mathematics",
            "institution": "Government Degree College for Men, Srikakulam\nDr. B.R. Ambedkar University, Srikakulam (BRAU)",
            "start_year": 2018,
            "end_year": 2021,
            "score_display": "Percentage: 70.80%",
            "icon": Education.IconChoice.FLASK,
            "order": 1,
        },
        {
            "degree": "Higher Secondary (12th)",
            "field_of_study": "MPC (Mathematics, Physics, Chemistry)",
            "institution": "Gayatri Junior College, Srikakulam\nBoard of Intermediate Education, Andhra Pradesh (BIEAP)",
            "start_year": 2016,
            "end_year": 2017,
            "score_display": "Percentage: 74.40%",
            "icon": Education.IconChoice.BOOK,
            "order": 2,
        },
        {
            "degree": "Secondary School (10th)",
            "field_of_study": "General Academic Curriculum",
            "institution": "Z.P. High School\nBoard of Secondary Education, Andhra Pradesh (BSEAP)",
            "start_year": 2014,
            "end_year": 2015,
            "score_display": "Percentage: 60.00%",
            "icon": Education.IconChoice.SCHOOL,
            "order": 3,
        }
    ]

    for edu_data in education_records:
        Education.objects.update_or_create(
            degree=edu_data["degree"],
            institution=edu_data["institution"],
            defaults=edu_data
        )
    print(f"Education seeded: {Education.objects.count()} records.")

    # 2. Seed 10 Initial Projects
    projects_list = [
        {
            "title": "Portfolio CMS Web Platform",
            "category": ProjectCategory.FULL_STACK,
            "description": "Full-stack portfolio with Django REST API, React UI, dynamic CMS administration and JWT auth.",
            "technologies": "Django, React.js, Tailwind CSS, SQLite, REST API",
            "order": 0,
            "is_featured": True,
        },
        {
            "title": "Task Management & Kanban System",
            "category": ProjectCategory.FULL_STACK,
            "description": "Collaborative project management board with drag-and-drop workflow and real-time status updates.",
            "technologies": "React, Node.js, Express, MongoDB, Tailwind CSS",
            "order": 1,
            "is_featured": True,
        },
        {
            "title": "Enterprise Blog & Editorial CMS",
            "category": ProjectCategory.FULL_STACK,
            "description": "Blogging platform with rich markdown editor, category taxonomies, comments, and role-based access.",
            "technologies": "Django REST Framework, PostgreSQL, Bootstrap, Redis",
            "order": 2,
            "is_featured": True,
        },
        {
            "title": "Dockerized Portfolio Infrastructure",
            "category": ProjectCategory.SYSTEMS,
            "description": "Multi-container Docker orchestration with Nginx reverse proxy, Gunicorn, PostgreSQL, and certbot.",
            "technologies": "Docker, Docker Compose, Nginx, Linux, PostgreSQL",
            "order": 3,
            "is_featured": True,
        },
        {
            "title": "E-Commerce Shopping & Checkout Suite",
            "category": ProjectCategory.FULL_STACK,
            "description": "E-commerce web application with product catalogs, shopping cart, Stripe payment, and order history.",
            "technologies": "React, Node.js, Stripe API, MongoDB, Redux",
            "order": 4,
            "is_featured": True,
        },
        {
            "title": "Real-Time Weather Intelligence App",
            "category": ProjectCategory.FRONTEND,
            "description": "Live weather forecasting dashboard consuming OpenWeather API with geolocation search and alerts.",
            "technologies": "JavaScript, HTML5, CSS3, OpenWeather API, Axios",
            "order": 5,
            "is_featured": True,
        },
        {
            "title": "Cloud Notes & Code Snippet Keeper",
            "category": ProjectCategory.FULL_STACK,
            "description": "Fast markdown notes organizer with tags, search filter, local caching, and offline support.",
            "technologies": "React, Vite, LocalStorage, Tailwind CSS",
            "order": 6,
            "is_featured": True,
        },
        {
            "title": "High-Performance REST API Gateway",
            "category": ProjectCategory.BACKEND,
            "description": "Scalable REST API with rate-limiting, caching, JWT authentication, and Swagger documentation.",
            "technologies": "Django REST Framework, Celery, Redis, PostgreSQL",
            "order": 7,
            "is_featured": True,
        },
        {
            "title": "Student Academic Records Portal",
            "category": ProjectCategory.FULL_STACK,
            "description": "University grade book and student information management system with PDF report generation.",
            "technologies": "Python, Django, SQLite, Chart.js",
            "order": 8,
            "is_featured": True,
        },
        {
            "title": "Real-Time Chat & Notification Engine",
            "category": ProjectCategory.BACKEND,
            "description": "Instant messaging service with WebSockets, presence detection, and push notifications.",
            "technologies": "Django Channels, WebSockets, Redis, React",
            "order": 9,
            "is_featured": True,
        },
    ]

    for p_data in projects_list:
        Project.objects.update_or_create(
            title=p_data["title"],
            defaults=p_data
        )
    print(f"Projects seeded: {Project.objects.count()} records.")

    # 3. Seed 15 Skills & Technologies
    skills_list = [
        ("Python", SkillCategory.LANGUAGES, 90, 0),
        ("JavaScript", SkillCategory.LANGUAGES, 88, 1),
        ("Django", SkillCategory.BACKEND, 88, 2),
        ("Django REST Framework", SkillCategory.BACKEND, 90, 3),
        ("React.js", SkillCategory.FRONTEND, 85, 4),
        ("Tailwind CSS", SkillCategory.FRONTEND, 92, 5),
        ("HTML5 & CSS3", SkillCategory.FRONTEND, 95, 6),
        ("PostgreSQL", SkillCategory.DATABASE, 82, 7),
        ("MySQL", SkillCategory.DATABASE, 85, 8),
        ("MongoDB", SkillCategory.DATABASE, 80, 9),
        ("SQLite", SkillCategory.DATABASE, 88, 10),
        ("Docker", SkillCategory.TOOLS, 82, 11),
        ("Git & GitHub", SkillCategory.TOOLS, 90, 12),
        ("RESTful APIs", SkillCategory.BACKEND, 92, 13),
        ("VS Code & Linux", SkillCategory.TOOLS, 85, 14),
    ]

    for name, cat, prof, order in skills_list:
        Skill.objects.update_or_create(
            name=name,
            defaults={
                "category": cat,
                "proficiency_percentage": prof,
                "order": order,
                "is_featured": True,
            }
        )
    print(f"Skills seeded: {Skill.objects.count()} records.")

    # 4. Seed 25 Certificates
    cert_data = [
        ("Python Full Stack Developer Virtual Internship", "EduSkills Academy & AICTE", "Dec 2025", "c85f1f38b6e67487a6e5e2667c7179b8"),
        ("Programming with Python 3.X", "Simplilearn SkillUp", "Dec 2025", "9609807"),
        ("Introduction to Prompt Engineering", "Simplilearn SkillUp", "Dec 2025", "9610480"),
        ("Fortinet Certified Associate in Cybersecurity", "Fortinet Training Institute", "Sept 2025", "3451334320TB"),
        ("Fortinet Certified Fundamentals in Cybersecurity", "Fortinet Training Institute", "Sept 2025", "5435469190TB"),
        ("Python (Basic & Intermediate) Skill Certification", "HackerRank", "2024", "HR-PY-SKILL-24"),
        ("SQL (Advanced) Certification", "HackerRank", "2024", "HR-SQL-ADV-24"),
        ("Full Stack Web Development Professional Certificate", "IBM / Coursera", "2024", "IBM-FS-2024-99"),
        ("PostgreSQL Database Design & Administration", "Udemy", "2023", "UC-PGSQL-2023-03"),
        ("Docker & Kubernetes: The Practical Guide", "Udemy", "2024", "UC-DOCKER-2024-04"),
        ("Responsive Web Design Certification", "freeCodeCamp", "2023", "FCC-RWD-2023"),
        ("Git & GitHub Complete Mastery", "Udemy", "2023", "UC-GIT-2023-05"),
        ("Developing RESTful APIs with Django REST Framework", "Coursera", "2024", "COURSERA-DRF-2024"),
        ("Google IT Automation with Python", "Google", "2023", "GOOG-IT-PY-2023"),
        ("Cloud Computing Fundamentals & AWS Basics", "Coursera", "2024", "AWS-CLOUD-2024"),
        ("Tailwind CSS From Scratch to Advanced", "Udemy", "2024", "UC-TW-2024-06"),
        ("Modern HTML5 & CSS3 Specialists", "Udemy", "2023", "UC-HTML-2023-07"),
        ("Node.js, Express & MongoDB Masterclass", "Udemy", "2024", "UC-NODE-2024-08"),
        ("Web Security: OWASP Top 10 Best Practices", "Coursera", "2024", "SEC-OWASP-2024"),
        ("Computer Networks & Protocols Fundamentals", "Infosys Springboard", "2023", "INFY-CN-2023"),
        ("Object Oriented Programming with Java", "Infosys Springboard", "2023", "INFY-OOP-2023"),
        ("Software Engineering & Agile Methodologies", "Coursera", "2023", "AGILE-SE-2023"),
        ("Linux Command Line & Shell Scripting", "Udemy", "2023", "UC-LINUX-2023-09"),
        ("Problem Solving (Intermediate) Certificate", "HackerRank", "2024", "HR-PS-INT-2024"),
        ("API Testing & Automation with Postman", "Postman Academy", "2024", "POSTMAN-API-2024"),
    ]

    for idx, (title, issuer, year, cred_id) in enumerate(cert_data):
        Certificate.objects.update_or_create(
            title=title,
            defaults={
                "issuer": issuer,
                "issue_date": year,
                "credential_id": cred_id,
                "credential_url": "https://example.com/verify/" + cred_id,
                "order": idx,
                "is_featured": True,
            }
        )
    print(f"Certificates seeded: {Certificate.objects.count()} records.")

    # 5. Sync Profile
    profile = Profile.objects.first()
    if profile:
        profile.total_projects_count = f"{Project.objects.count()}+"
        profile.total_certificates_count = f"{Certificate.objects.count()}+"
        profile.badge_title = "MCA Graduate"
        profile.save()
        print(f"Profile updated: {profile.total_projects_count} projects, {profile.total_certificates_count} certificates.")

    print("--- Seeding Completed Successfully ---")

if __name__ == '__main__':
    seed_data()
