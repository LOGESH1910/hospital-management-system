import express, { Router, Request, Response } from "express";
import { requireRole } from "../middleware/auth.middleware";
import {
  getDashboardStats,
  getRecentAppointments,
  getRecentPatients,
  getDoctorsAwaitingApproval,
  getPaymentSummary,
  getAllDoctors,
  approveDoctor,
  rejectDoctor,
  deactivateDoctor,
  getDepartments,
  getDepartmentStats,
  getMedicalRecords,
  getPrescriptions,
  searchDoctors,
} from "../controllers/admin.controller";

const router: Router = express.Router();

// All admin routes require ADMIN role
router.use(requireRole("ADMIN"));

router.get("/dashboard", getDashboardStats);
router.get("/recent-appointments", getRecentAppointments);
router.get("/recent-patients", getRecentPatients);
router.get("/doctors-awaiting-approval", getDoctorsAwaitingApproval);
router.get("/payments", getPaymentSummary);
router.get("/doctors", getAllDoctors);
router.get("/doctors/search", searchDoctors);
router.put("/doctors/:id/approve", approveDoctor);
router.put("/doctors/:id/reject", rejectDoctor);
router.put("/doctors/:id/deactivate", deactivateDoctor);
router.get("/departments", getDepartments);
router.get("/departments/:department", getDepartmentStats);
router.get("/medical-records", getMedicalRecords);
router.get("/prescriptions", getPrescriptions);

export default router;