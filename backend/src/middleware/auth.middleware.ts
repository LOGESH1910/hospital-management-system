import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ status: "fail", message: "No token provided" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded; // attach user ID to req.user
    next();
  } catch (error) {
    return res.status(401).json({ status: "fail", message: "Invalid or expired token" });
  }
};

export const requireRole = (role: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const roles = Array.isArray(role) ? role : [role];
    if (!roles.includes((req as any).user?.role)) {
      return res.status(403).json({ status: "fail", message: "Insufficient permissions" });
    }
    next();
  };
};