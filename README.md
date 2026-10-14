# ≡ƒÅÑ MediCare Pro ΓÇô Hospital Patient & Doctor Management System

A production-ready, full-stack hospital management SaaS with separate portals for Admin, Doctor, and Patient.

---

## ≡ƒÜÇ Tech Stack

**Frontend:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Recharts, Radix UI  
**Backend:** Node.js, Express.js, MongoDB, JWT Authentication, bcrypt

---

## ≡ƒôï Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))

---

## ΓÜí Quick Start

### 1. Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configure Backend

Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/medicare_pro
JWT_SECRET=your_super_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
```

### 3. Seed the Database

```bash
cd backend
npm run seed
```

This creates demo accounts:

| Role    | Email                  | Password    |
|---------|------------------------|-------------|
| Admin   | admin@medicare.com     | Admin@123   |
| Doctor  | doctor@medicare.com    | Doctor@123  |
| Patient | patient@medicare.com   | Patient@123 |

### 4. Start the Servers

**Backend** (terminal 1):
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Frontend** (terminal 2):
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

### 5. Open Browser

Visit [http://localhost:3000](http://localhost:3000)

---

## ≡ƒùé Project Structure

```
hospital management system/
Γö£ΓöÇΓöÇ backend/
Γöé   Γö£ΓöÇΓöÇ config/         # MongoDB connection
Γöé   Γö£ΓöÇΓöÇ controllers/    # Route handlers (auth, doctors, patients, appointments...)
Γöé   Γö£ΓöÇΓöÇ middleware/     # JWT auth, error handler
Γöé   Γö£ΓöÇΓöÇ models/         # Mongoose schemas
Γöé   Γö£ΓöÇΓöÇ routes/         # Express routes
Γöé   Γö£ΓöÇΓöÇ utils/          # Token helpers, seeder
Γöé   ΓööΓöÇΓöÇ server.js       # Express app entry
Γöé
ΓööΓöÇΓöÇ frontend/
    Γö£ΓöÇΓöÇ app/
    Γöé   Γö£ΓöÇΓöÇ page.tsx                    # Landing page
    Γöé   ΓööΓöÇΓöÇ dashboard/
    Γöé       Γö£ΓöÇΓöÇ admin/                  # Admin dashboard + doctors/patients/appointments/departments/analytics
    Γöé       Γö£ΓöÇΓöÇ doctor/                 # Doctor portal + appointments/patients/records/prescriptions/profile
    Γöé       ΓööΓöÇΓöÇ patient/                # Patient portal + book/appointments/records/prescriptions/profile
    Γö£ΓöÇΓöÇ components/
    Γöé   Γö£ΓöÇΓöÇ auth/       # Login/Register modal
    Γöé   Γö£ΓöÇΓöÇ dashboard/  # StatCard, charts
    Γöé   Γö£ΓöÇΓöÇ layout/     # DashboardLayout (sidebar + topbar)
    Γöé   ΓööΓöÇΓöÇ ui/         # Button, Card, Badge, Input, Dialog, Avatar
    ΓööΓöÇΓöÇ lib/
        Γö£ΓöÇΓöÇ api.ts          # Axios API client with all endpoints
        Γö£ΓöÇΓöÇ auth-context.tsx # Auth state (React Context)
        ΓööΓöÇΓöÇ utils.ts        # Helpers
```

---

## ≡ƒöæ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Register |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/doctors` | List doctors (public) |
| GET | `/api/doctors/:id/slots` | Get available time slots |
| GET | `/api/patients/profile/me` | Patient profile |
| GET | `/api/appointments` | List appointments |
| POST | `/api/appointments` | Book appointment |
| GET | `/api/departments` | List departments |
| GET | `/api/admin/stats` | Admin dashboard stats |
| GET | `/api/admin/trends/appointments` | Appointment trends chart |

---

## Γ£¿ Features

- **Landing Page** ΓÇö glassmorphism hero, department cards, demo account quick-login
- **Admin Dashboard** ΓÇö stats cards, 5 interactive charts, manage doctors/patients/appointments/departments
- **Doctor Portal** ΓÇö today's schedule, appointment management, patient records, prescriptions, profile
- **Patient Portal** ΓÇö 5-step appointment booking, appointment history, medical records, prescriptions, profile
- **JWT Auth** ΓÇö access + refresh tokens, role-based route protection
- **Responsive** ΓÇö mobile-first design, collapsible sidebar
- **Animations** ΓÇö Framer Motion page transitions and hover effects
