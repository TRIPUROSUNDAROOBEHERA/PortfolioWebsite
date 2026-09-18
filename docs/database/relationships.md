# 🔗 Entity Relationship Model

Visual mapping of foreign key constraints, cascade rules, and entity connections.

---

```text
┌───────────────────────┐           ┌───────────────────────┐
│     accounts_user     │ 1       * │     blogs_blogpost    │
│───────────────────────│───────────│───────────────────────│
│ id (PK)               │           │ id (PK)               │
│ username              │           │ author_id (FK)        │
│ email                 │           │ category_id (FK)      │
└───────────────────────┘           └───────────┬───────────┘
                                                │ *
                                                │
                                                │ 1
                                    ┌───────────┴───────────┐
                                    │   blogs_blogcategory  │
                                    │───────────────────────│
                                    │ id (PK)               │
                                    │ name, slug            │
                                    └───────────────────────┘

┌───────────────────────┐           ┌───────────────────────┐
│projects_projectcateg. │ 1       * │   projects_project    │
│───────────────────────│───────────│───────────────────────│
│ id (PK)               │           │ id (PK)               │
│ name, slug            │           │ category_id (FK)      │
└───────────────────────┘           └───────────────────────┘

┌───────────────────────┐           ┌───────────────────────┐
│  skills_skillcategory │ 1       * │      skills_skill     │
│───────────────────────│───────────│───────────────────────│
│ id (PK)               │           │ id (PK)               │
│ name, slug            │           │ category_id (FK)      │
└───────────────────────┘           └───────────────────────┘