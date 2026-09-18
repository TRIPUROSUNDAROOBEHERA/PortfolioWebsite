# Database Schema Specification

## Core Tables

### 1. `projects_project`
* `id`: PK (UUID / AutoInteger)
* `title`: VARCHAR(255)
* `slug`: VARCHAR(255) (Unique)
* `description`: TEXT
* `content`: TEXT (Markdown)
* `featured`: BOOLEAN
* `github_url`: URL
* `live_demo_url`: URL
* `thumbnail`: ImageField
* `created_at`: TIMESTAMP

### 2. `blogs_blogpost`
* `id`: PK
* `title`: VARCHAR(255)
* `slug`: VARCHAR(255) (Unique)
* `excerpt`: TEXT
* `content`: TEXT
* `cover_image`: ImageField
* `published_at`: TIMESTAMP

### 3. `skills_skill`
* `id`: PK
* `name`: VARCHAR(100)
* `category`: VARCHAR(50) (backend, frontend, devops, database)
* `proficiency`: INTEGER (0-100)
* `display_order`: INTEGER