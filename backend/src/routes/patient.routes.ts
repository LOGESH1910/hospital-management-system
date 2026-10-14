import express, { Router, Request, Response } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { getPatientProfile, updatePatientProfile } from "../controllers/patient.controller";

const router: Router = express.Router();

// All patient routes require authentication
router.use(requireAuth);

router.get("/profile", getPatientProfile);
router.patch("/profile", updatePatientProfile);

export default router;