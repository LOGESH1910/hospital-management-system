import { Request, Response } from "express";
import { UserModel } from "../config/db-adapter";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response, next: any) => {
  try {
    const { fullName, email, phone, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "fail", message: "Email already registered" });
    }

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await UserModel.create({
      name: fullName,
      email,
      phone,
      passwordHash,
      role: "PATIENT",
    });

    const expiresIn = process.env.JWT_EXPIRES_IN || "30d";
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn } as any
    );

    user.passwordHash = undefined;

    res.status(201).json({
      status: "success",
      token,
      data: { user },
    });
  } catch (error: any) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: any) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: "fail", message: "Incorrect email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ status: "fail", message: "Incorrect email or password" });
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || "30d";
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn } as any
    );

    user.passwordHash = undefined;

    res.status(200).json({
      status: "success",
      token,
      data: { user },
    });
  } catch (error: any) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export const getMe = async (req: Request, res: Response, next: any) => {
  try {
    const userId = (req as any).user?.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error: any) {
    next(error);
  }
};