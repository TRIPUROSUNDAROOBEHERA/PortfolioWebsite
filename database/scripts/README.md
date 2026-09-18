# Database Automation Scripts

Automated batch scripts for managing database backups and restoration routines on Windows.

---

## 🛠️ Available Scripts

### 1. `backup_database.bat`
* **Purpose**: Generates an isolated JSON dump of all application tables with a timestamp.
* **Output Location**: `database/backups/development/backup_YYYYMMDD_HHMMSS.json`
* **Usage**: Double-click `backup_database.bat` or run from terminal:
  ```cmd
  .\database\scripts\backup_database.bat