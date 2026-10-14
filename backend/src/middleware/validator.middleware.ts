import { z } from "zod";

// Register validation
export const registerValidator = (req: any, res: any, next: any) => {
  const schema = z.object({
    fullName: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string().min(10).max(15),
    password: z.string().min(6).max(100),
  });

  try {
    schema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({ status: "fail", message: error.errors.map((e: any) => e.message).join(", ") });
  }
};

// Login validation
export const loginValidator = (req: any, res: any, next: any) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  });

  try {
    schema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({ status: "fail", message: error.errors.map((e: any) => e.message).join(", ") });
  }
};