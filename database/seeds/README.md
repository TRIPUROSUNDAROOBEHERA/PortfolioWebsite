# Database Seeds & Fixtures

This folder holds initial seed datasets in Django JSON serialization format.

## Available Fixtures

* **`projects_skills.json`**: Initial skill sets (Python, React, Django, MySQL, Tailwind) and featured project entries.
* **`blogs.json`**: Initial technical articles and development post summaries.

## How to Export New Seeds from Current Database

To capture current database state as a reusable seed file:

```bash
# Export all skills
python backend/manage.py dumpdata skills --indent 2 > database/seeds/projects_skills.json

# Export all blog posts
python backend/manage.py dumpdata blogs --indent 2 > database/seeds/blogs.json