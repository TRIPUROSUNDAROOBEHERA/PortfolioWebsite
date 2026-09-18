---

### **2. `docs/architecture/frontend-architecture.md`**
```markdown
# 💻 Frontend Architecture

The client application is built with **React**, bundled via **Vite**, styled using **Tailwind CSS**, and uses standard modular state management.

---

## 📂 Frontend Directory Structure

```text
frontend/
├── src/
│   ├── assets/         # Global images, icons, and fonts
│   ├── components/     # Reusable atomic UI components (Button, Modal, Card, Navbar)
│   ├── context/        # React Context providers (AuthContext, ThemeContext)
│   ├── hooks/          # Custom React hooks (useFetch, useAuth, useDebounce)
│   ├── pages/          # View pages (Home, Projects, BlogDetail, AdminDashboard)
│   ├── services/       # Axios API clients and network calls
│   ├── utils/          # Formatting helpers, date parsers, constants
│   ├── App.jsx         # Root router and layout container
│   └── main.jsx        # App entry point
├── package.json
└── vite.config.js  