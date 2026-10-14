import { Request, Response } from "express";
import { UserModel } from "../config/db-adapter";

const getQueryValue = (query: any, key: string): string | undefined => {
  const value = query[key];
  if (Array.isArray(value)) return value[0];
  if (typeof value === "string") return value;
  return undefined;
};

export const getAllDoctors = async (req: Request, res: Response, next: any) => {
  try {
    const specialization = getQueryValue(req.query, "specialization");
    const department = getQueryValue(req.query, "department");
    const name = getQueryValue(req.query, "name");

    const filter: any = { role: "DOCTOR" };
    if (specialization) {
      filter.specialization = new RegExp(specialization, "i");
    }
    if (department) {
      filter.department = new RegExp(department, "i");
    }
    if (name) {
      filter.name = new RegExp(name, "i");
    }

    if ((req as any).user?.role !== "ADMIN") {
      filter.isActive = true;
    }

    const doctors = await UserModel.find(filter);
    
    const sanitizedDoctors = doctors.map((doc: any) => {
      const { passwordHash, ...rest } = doc;
      return rest;
    });

    res.status(200).json({
      status: "success",
      results: sanitizedDoctors.length,
      data: { doctors: sanitizedDoctors },
    });
  } catch (error: any) {
    next(error);
  }
};

export const getDoctorById = async (req: Request, res: Response, next: any) => {
  try {
    const doctor = await UserModel.findById(req.params.id as string);
    if (!doctor) {
      return res.status(404).json({ status: "fail", message: "Doctor not found" });
    }

    const { passwordHash, ...rest } = doctor;

    res.status(200).json({
      status: "success",
      data: { doctor: rest },
    });
  } catch (error: any) {
    next(error);
  }
};

export const createDoctor = async (req: Request, res: Response, next: any) => {
  try {
    const { name, email, phone, specialization, qualification, experience, department, consultationFee, bio } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "fail", message: "Email already registered" });
    }

    const user = await UserModel.create({
      name,
      email,
      phone,
      role: "DOCTOR",
      specialization,
      qualification,
      experience,
      department,
      consultationFee: consultationFee || 0,
      bio,
      approvalStatus: "PENDING",
    });

    res.status(201).json({
      status: "success",
      data: { user },
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateDoctor = async (req: Request, res: Response, next: any) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "specialization", "qualification", "experience", "department", "consultationFee", "bio", "profileImage"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ status: "fail", message: "Invalid updates" });
    }

    const doctor = await UserModel.findByIdAndUpdate(req.params.id as string, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doctor) {
      return res.status(404).json({ status: "fail", message: "Doctor not found" });
    }

    const { passwordHash, ...rest } = doctor;

    res.status(200).json({
      status: "success",
      data: { doctor: rest },
    });
  } catch (error: any) {
    next(error);
  }
};

export const approveDoctor = async (req: Request, res: Response, next: any) => {
  try {
    const doctor = await UserModel.findByIdAndUpdate(
      req.params.id as string,
      { approvalStatus: "APPROVED" },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ status: "fail", message: "Doctor not found" });
    }

    const { passwordHash, ...rest } = doctor;

    res.status(200).json({
      status: "success",
      data: { doctor: rest },
    });
  } catch (error: any) {
    next(error);
  }
};

export const rejectDoctor = async (req: Request, res: Response, next: any) => {
  try {
    const doctor = await UserModel.findByIdAndUpdate(
      req.params.id as string,
      { approvalStatus: "REJECTED" },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ status: "fail", message: "Doctor not found" });
    }

    const { passwordHash, ...rest } = doctor;

    res.status(200).json({
      status: "success",
      data: { doctor: rest },
    });
  } catch (error: any) {
    next(error);
  }
};

export const deactivateDoctor = async (req: Request, res: Response, next: any) => {
  try {
    const doctor = await UserModel.findByIdAndUpdate(
      req.params.id as string,
      { isActive: false },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ status: "fail", message: "Doctor not found" });
    }

    const { passwordHash, ...rest } = doctor;

    res.status(200).json({
      status: "success",
      data: { doctor: rest },
    });
  } catch (error: any) {
    next(error);
  }
};

export const getDoctorAvailability = async (req: Request, res: Response, next: any) => {
  try {
    const doctor = await UserModel.findById(req.params.id as string);
    if (!doctor) {
      return res.status(404).json({ status: "fail", message: "Doctor not found" });
    }

    res.status(200).json({
      status: "success",
      data: { availability: doctor.availability || [] },
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateDoctorAvailability = async (req: Request, res: Response, next: any) => {
  try {
    const doctor = await UserModel.findByIdAndUpdate(
      req.params.id as string,
      { availability: req.body.availability },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ status: "fail", message: "Doctor not found" });
    }

    const { passwordHash, ...rest } = doctor;

    res.status(200).json({
      status: "success",
      data: { doctor: rest },
    });
  } catch (error: any) {
    next(error);
  }
};

export const searchDoctors = async (req: Request, res: Response, next: any) => {
  try {
    const { q, specialization, department } = req.query;
    const filter: any = { role: "DOCTOR", isActive: true, approvalStatus: "APPROVED" };
    
    if (q) {
      filter.$or = [
        { name: { $regex: q as string, $options: "i" } },
        { specialization: { $regex: q as string, $options: "i" } },
        { department: { $regex: q as string, $options: "i" } },
      ];
    }
    if (specialization) filter.specialization = { $regex: specialization as string, $options: "i" };
    if (department) filter.department = { $regex: department as string, $options: "i" };
    
    const doctors = await UserModel.find(filter);
    
    const sanitized = doctors.map((d: any) => {
      const { passwordHash, ...rest } = d;
      return rest;
    });

    res.status(200).json({
      status: "success",
      results: sanitized.length,
      data: { doctors: sanitized },
    });
  } catch (error: any) {
    next(error);
  }
};