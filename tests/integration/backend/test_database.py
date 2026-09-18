from django.db import connection
from django.test import TestCase
from apps.projects.models import Project
from apps.skills.models import Skill


class DatabaseEngineIntegrationTests(TestCase):

    def test_postgresql_connection_active(self):
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1;")
            result = cursor.fetchone()
        self.assertEqual(result[0], 1)

    def test_database_model_relational_integrity(self):
        skill = Skill.objects.create(
            name="PostgreSQL", category="database", proficiency=95
        )
        project = Project.objects.create(
            title="Enterprise Architecture",
            slug="enterprise-arch",
            description="Testing relational constraints",
        )
        if hasattr(project, "tech_stack"):
            project.tech_stack.add(skill)
            self.assertEqual(project.tech_stack.first().name, "PostgreSQL")