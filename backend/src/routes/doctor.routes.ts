import express, { Router, Request, Response } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware";
import { getAllDoctors, getDoctorById, createDoctor, updateDoctor, approveDoctor, rejectDoctor, deactivateDoctor, getDoctorAvailability, updateDoctorAvailability, searchDoctors } from "../controllers/doctor.controller";

const router: Router = express.Router();

// Public routes
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.get("/search", searchDoctors);

// Protected routes - require authentication
router.use(requireAuth);

// Doctor management - ADMIN only
router.post("/", requireRole("ADMIN"), createDoctor);
router.patch("/:id", requireRole("ADMIN"), updateDoctor);
router.patch("/:id/approve", requireRole("ADMIN"), approveDoctor);
router.patch("/:id/reject", requireRole("ADMIN"), rejectDoctor);
router.patch("/:id/deactivate", requireRole("ADMIN"), deactivateDoctor);

// Availability - ADMIN and DOCTOR
router.get("/:id/availability", requireRole(["ADMIN", "DOCTOR"]), getDoctorAvailability);
router.patch("/:id/availability", requireRole(["ADMIN", "DOCTOR"]), updateDoctorAvailability);

export default router;