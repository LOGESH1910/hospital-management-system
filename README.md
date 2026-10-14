# MediCare Pro — Hospital Management System

Full-stack hospital management app with separate portals for **Admin**, **Doctor**, and **Patient**.

- **Backend:** Node.js + Express + TypeScript, MongoDB (Mongoose) with in-memory mock fallback, JWT auth, Zod validation, Groq AI endpoint
- **Frontend:** Next.js 15 (App Router) + React 19 + TypeScript, Tailwind CSS, React Hook Form + Zod, Axios, Recharts

## Prerequisites

- Node.js 18+
- MongoDB (optional — backend runs in mock mode if `MONGODB_URI` is unreachable)

## Quick Start

```bash
# 1. Clone
git clone https://github.com/LOGESH1910/hospital-management-system.git
cd hospital-management-system

# 2. Backend
cd backend
npm install
npm run dev        # http://localhost:5000

# 3. Frontend (new terminal)
cd frontend
npm install
npm run dev        # http://localhost:3000
```

Open http://localhost:3000 and check backend health at http://localhost:5000/health.

## Environment Variables

Backend (`backend/.env`) — never committed:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/medicare_pro
JWT_SECRET=change-me-to-a-long-random-string
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
BCRYPT_SALT_ROUNDS=10
GROQ_API_KEY=your-groq-key-here   # optional, only for /api/ai
```

Frontend (`frontend/.env.local`) — never committed:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Scripts

Backend (`backend/`):

| Command      | What it does                        |
|--------------|-------------------------------------|
| `npm run dev`   | Start API in watch mode (ts-node-dev) |
| `npm run build` | Compile TypeScript to `dist/`         |
| `npm start`     | Run compiled API (`node dist/index.js`) |
| `npm test`      | Run Jest tests                        |
| `npm run lint`  | Run ESLint                            |

Frontend (`frontend/`):

| Command      | What it does                     |
|--------------|----------------------------------|
| `npm run dev`   | Start Next.js dev server            |
| `npm run build` | Production build                    |
| `npm start`     | Serve production build              |
| `npm run lint`  | Run Next.js lint                    |

## Project Structure

```
hospital-management-system/
├── backend/
│   ├── src/
│   │   ├── index.ts              # Express app entry, mounts /api/*, /health
│   │   ├── config/               # database.ts, db-adapter.ts, mock-db.ts
│   │   ├── controllers/          # admin, appointment, auth, doctor, patient
│   │   ├── middleware/           # auth.middleware, validator.middleware, errorHandler
│   │   ├── models/               # appointment.model, user.model
│   │   ├── routes/               # auth, doctor, patient, appointment, admin, ai
│   │   ├── services/             # groqService.ts (AI)
│   │   └── utils/                # apiError.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx          # Landing page
│   │   │   ├── login/ signup/ search/
│   │   │   ├── patient/dashboard/
│   │   │   ├── doctor/dashboard/
│   │   │   ├── admin/            # dashboard, analytics, appointments,
│   │   │   │                     # departments, doctors, medical-records,
│   │   │   │                     # notifications, payments, prescriptions, settings
│   │   │   └── api/              # Next.js proxy routes to the backend
│   │   ├── components/           # layout, sections, ui (buttons, cards, tables...)
│   │   ├── lib/                  # utils.ts
│   │   └── styles/
│   ├── public/assets/
│   ├── package.json
│   └── tailwind.config.ts
├── .gitignore
└── README.md
```

## API Reference (Backend)

Base URL: `http://localhost:5000`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | — | API + DB status |
| POST | `/api/auth/register` | — | Register (validated with Zod) |
| POST | `/api/auth/login` | — | Login, returns JWT |
| GET | `/api/auth/me` | User | Current user |
| POST | `/api/auth/logout` | — | Clear auth cookie |
| GET | `/api/doctors` | — | List/search doctors |
| GET | `/api/patients/...` | Patient | Patient profile + records |
| GET/POST | `/api/appointments` | User | List / book appointments |
| GET | `/api/admin/dashboard` | Admin | Dashboard stats |
| GET | `/api/admin/recent-appointments` | Admin | Recent appointments |
| GET | `/api/admin/recent-patients` | Admin | Recent patients |
| GET | `/api/admin/doctors-awaiting-approval` | Admin | Approval queue |
| PUT | `/api/admin/doctors/:id/approve` | Admin | Approve doctor |
| PUT | `/api/admin/doctors/:id/reject` | Admin | Reject doctor |
| PUT | `/api/admin/doctors/:id/deactivate` | Admin | Deactivate doctor |
| GET | `/api/admin/departments` | Admin | Departments + stats |
| GET | `/api/admin/medical-records` | Admin | All medical records |
| GET | `/api/admin/prescriptions` | Admin | All prescriptions |
| GET | `/api/admin/payments` | Admin | Payment summary |
| * | `/api/ai` | User | AI assistant (needs `GROQ_API_KEY`) |

The frontend calls the backend through its own `/api/*` proxy routes (see `frontend/src/app/api/`), so the browser only talks to Next.js and `NEXT_PUBLIC_API_URL` points the server components/proxies at Express.

## Portals

- **Patient** (`/patient/dashboard`): search doctors, book appointments, view history, cancel.
- **Doctor** (`/doctor/dashboard`): view appointments, complete / reschedule, manage profile.
- **Admin** (`/admin/dashboard` + sub-pages): approve doctors, manage departments, view analytics (Recharts), payments, records, prescriptions, settings.

## Notes

- Auth is JWT (Bearer + httpOnly cookie support) with role checks (`ADMIN`, `DOCTOR`, `PATIENT`) in `auth.middleware.ts`.
- Request bodies are validated with Zod in `validator.middleware.ts`; errors use the shared `ApiError` handler.
- If MongoDB is down, the backend falls back to `mock-db.ts` so the UI still runs for demo/dev.
- `node_modules/`, `.env*`, `.next/`, and `dist/` are git-ignored and never pushed.

## License

MIT
