import express, { Router, Request, Response } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware";
import { getAllAppointments, getAppointment } from "../controllers/appointment.controller";

const router: Router = express.Router();

// Patient routes
router.use(requireAuth);
router.get("/", getAllAppointments);
router.get("/:id", getAppointment);

// Admin routes
router.use(requireRole("ADMIN"));
router.get("/admin", getAllAppointments);

export default router;