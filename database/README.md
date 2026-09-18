# 🗄️ Database Architecture & Management

This directory contains database backups, seed fixtures, automation utilities, and lifecycle management scripts for the Portfolio and CMS platform.

---

## 📁 Directory Structure

```text
database/
├── backups/
│   ├── development/      # Timestamped JSON/SQL backups from local dev
│   └── production/       # Production database snapshots
├── seeds/                # Starter seed data fixtures (JSON format)
│   ├── projects_skills.json
│   ├── blogs.json
│   └── README.md
├── scripts/              # Windows batch scripts for rapid operations
│   ├── backup_database.bat
│   ├── restore_database.bat
│   └── README.md
└── README.md             # Master database documentation (this file)