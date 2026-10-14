import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { groqService } from "../services/groqService";

const router: Router = Router();

router.post("/chat", requireAuth, async (req, res, next) => {
  try {
    const { message, model } = req.body;
    if (!message) {
      return res.status(400).json({ status: "fail", message: "Message is required" });
    }
    const response = await groqService.chatCompletion([{ role: "user", content: message }], model);
    res.status(200).json({ status: "success", data: { response } });
  } catch (error: any) {
    next(error);
  }
});

router.post("/recommend-doctors", requireAuth, async (req, res, next) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ status: "fail", message: "Query is required" });
    }
    const response = await groqService.doctorRecommendation(query);
    res.status(200).json({ status: "success", data: { recommendations: response } });
  } catch (error: any) {
    next(error);
  }
});

router.post("/analyze-symptoms", requireAuth, async (req, res, next) => {
  try {
    const { symptoms } = req.body;
    if (!symptoms) {
      return res.status(400).json({ status: "fail", message: "Symptoms are required" });
    }
    const response = await groqService.medicalReportAnalysis(symptoms);
    res.status(200).json({ status: "success", data: { analysis: response } });
  } catch (error: any) {
    next(error);
  }
});

export default router;