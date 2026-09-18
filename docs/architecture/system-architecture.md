# 🏗️ System Architecture Overview

This project is built as a modern, decoupled Full-Stack Web Application featuring a **Django REST Framework (DRF)** backend API and a **React + Vite** Single Page Application (SPA) frontend, orchestrated with **Docker** and **Nginx**.

---

## 🏛️ High-Level Component Diagram

```text
       [ Public Visitors / Admins ]
                    │ (HTTPS / HTTP)
                    ▼
          ┌───────────────────┐
          │   Nginx Ingress   │  (Reverse Proxy & SSL Termination)
          └─────────┬─────────┘
                    │
       ┌────────────┴────────────┐
       │                         │
       ▼                         ▼
┌──────────────┐         ┌──────────────┐
│ React (Vite) │         │ Django (DRF) │
│ Frontend SPA │         │ Backend API  │
│ (Port 5173)  │         │ (Port 8000)  │
└──────────────┘         └───────┬──────┘
                                 │
                 ┌───────────────┼───────────────┐
                 │               │               │
                 ▼               ▼               ▼
          ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
          │ PostgreSQL  │ │ Media Files │ │ Local/SMTP  │
          │ / MySQL DB  │ │ Storage     │ │ Email Svc   │
          └─────────────┘ └─────────────┘ └─────────────┘