import { Request, Response } from "express";
import { UserModel } from "../config/db-adapter";

export const getPatientProfile = async (req: Request, res: Response, next: any) => {
  try {
    const userId = (req as any).user?.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    const { passwordHash, ...rest } = user;

    res.status(200).json({
      status: "success",
      data: { user: rest },
    });
  } catch (error: any) {
    next(error);
  }
};

export const updatePatientProfile = async (req: Request, res: Response, next: any) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "phone", "profileImage"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ status: "fail", message: "Invalid updates" });
    }

    const userId = (req as any).user?.id;
    const user = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    const { passwordHash, ...rest } = user;

    res.status(200).json({
      status: "success",
      data: { user: rest },
    });
  } catch (error: any) {
    next(error);
  }
};