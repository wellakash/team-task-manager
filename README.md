# Team Task Manager (Full-Stack)

A robust task management application built for team collaboration with role-based access control.

## 🚀 Live Demo
**Live URL:** [Paste your Railway URL here once deployed]

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Lucide-React (Icons), Axios
- **Backend:** Java Spring Boot, Spring Data JPA
- **Database:** H2 (Local Development) / MySQL (Production/Railway)
- **Deployment:** Railway

## ✨ Key Features
- **Authentication**: Secure login for Team Members and Admins.
- **Role-Based Access (RBAC)**: 
  - **Admins**: Full CRUD permissions (Create, View, and Delete tasks).
  - **Members**: View-only access with ability to toggle completion status.
- **Project Management**: Grouping tasks under specific project names.
- **Responsive Dashboard**: Dark-themed UI for managing team workloads.

## ⚙️ Local Setup
1. **Backend**:
   - Navigate to `/backend`.
   - Run `./mvnw spring-boot:run`.
   - Default test users: `admin/123` and `member/123`.
2. **Frontend**:
   - Navigate to `/frontend`.
   - Run `npm install` then `npm run dev`.

## 📦 Submission Requirements
- [x] REST APIs + Database
- [x] Role-based access control
- [x] Deployed on Railway