import express, { Router, Request, Response } from "express";
import { registerValidator, loginValidator } from "../middleware/validator.middleware";
import { register, login, logout, getMe } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router: Router = express.Router();

// Public auth routes
router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.get("/me", requireAuth, getMe);
router.post("/logout", logout);

export default router;