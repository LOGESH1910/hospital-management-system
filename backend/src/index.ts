import "dotenv/config";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import doctorRoutes from "./routes/doctor.routes";
import patientRoutes from "./routes/patient.routes";
import appointmentRoutes from "./routes/appointment.routes";
import adminRoutes from "./routes/admin.routes";
import aiRoutes from "./routes/ai.routes";
import { globalErrorHandler } from "./middleware/errorHandler";
import { connectDB, getDBStatus } from "./config/database";

process.on("unhandledRejection", (err: any) => {
  console.error("UNHANDLED REJECTION! 💥 Shutting down...");
  console.error(err.name, err.message, err.stack);
  process.exit(1);
});

process.on("uncaughtException", (err: any) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.error(err.name, err.message, err.stack);
  process.exit(1);
});

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Request logging
app.use((req: Request, res: Response, next: any) => {
  console.log(`📥 ${req.method} ${req.path}`, req.body ? JSON.stringify(req.body).substring(0, 200) : "");
  next();
});

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ai", aiRoutes);

app.get("/health", (req: Request, res: Response) => {
  const dbStatus = getDBStatus();
  res.json({ 
    status: "ok", 
    message: "MediCare Pro API is running",
    mongodb: getDBStatus().connected ? "connected" : "disconnected (mock mode)"
  });
});

app.use(
  (
    err: any,
    req: Request,
    res: Response,
    next: any
  ) => {
    console.error("Global error handler:", err);
    globalErrorHandler(err, req, res, next);
  }
);

app.listen(port, () => {
  console.log(`🏥 MediCare Pro API running on port ${port}`);
});

export default app;