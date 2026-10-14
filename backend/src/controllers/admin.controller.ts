import { Request, Response } from "express";
import { AppointmentModel, UserModel } from "../config/db-adapter";

export const getDashboardStats = async (req: Request, res: Response, next: any) => {
  try {
    const totalPatients = await UserModel.countDocuments({ role: "PATIENT", isActive: true });
    const totalDoctors = await UserModel.countDocuments({ role: "DOCTOR", isActive: true, approvalStatus: "APPROVED" });
    const totalAppointments = await AppointmentModel.countDocuments({});
    const pendingAppointments = await AppointmentModel.countDocuments({ status: "PENDING" });
    const confirmedAppointments = await AppointmentModel.countDocuments({ status: "CONFIRMED" });
    const completedAppointments = await AppointmentModel.countDocuments({ status: "COMPLETED" });

    const completedWithPayment = await AppointmentModel.find({
      status: "COMPLETED",
      paymentStatus: "SUCCESS",
    });

    const revenue = completedWithPayment.reduce(
      (sum: number, app: any) => sum + (app.consultationFee || 0),
      0
    );

    res.status(200).json({
      status: "success",
      data: {
        totalPatients,
        totalDoctors,
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        completedAppointments,
        revenue,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const getRecentAppointments = async (req: Request, res: Response, next: any) => {
  try {
    const appointments = await AppointmentModel.find({});
    
    for (const apt of appointments) {
      if (apt.patient) {
        const patient = await UserModel.findById(apt.patient);
        if (patient) apt.patient = { _id: patient._id, name: patient.name, email: patient.email };
      }
      if (apt.doctor) {
        const doctor = await UserModel.findById(apt.doctor);
        if (doctor) apt.doctor = { _id: doctor._id, name: doctor.name, specialization: doctor.specialization };
      }
    }
    
    appointments.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    res.status(200).json({
      status: "success",
      results: appointments.length,
      data: { appointments: appointments.slice(0, 10) },
    });
  } catch (error: any) {
    next(error);
  }
};

export const getRecentPatients = async (req: Request, res: Response, next: any) => {
  try {
    const patients = await UserModel.find({ role: "PATIENT" });
    patients.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    const sanitized = patients.map((p: any) => {
      const { passwordHash, ...rest } = p;
      return rest;
    });

    res.status(200).json({
      status: "success",
      results: sanitized.length,
      data: { patients: sanitized.slice(0, 10) },
    });
  } catch (error: any) {
    next(error);
  }
};

export const getDoctorsAwaitingApproval = async (req: Request, res: Response, next: any) => {
  try {
    const doctors = await UserModel.find({ role: "DOCTOR", approvalStatus: "PENDING" });
    doctors.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
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

export const getPaymentSummary = async (req: Request, res: Response, next: any) => {
  try {
    const appointments = await AppointmentModel.find({});
    
    const summary = {
      PENDING: { count: 0, totalAmount: 0 },
      SUCCESS: { count: 0, totalAmount: 0 },
      FAILED: { count: 0, totalAmount: 0 },
      REFUNDED: { count: 0, totalAmount: 0 },
    };

    for (const apt of appointments) {
      const status = apt.paymentStatus || "PENDING";
      if (summary[status as keyof typeof summary]) {
        summary[status as keyof typeof summary].count++;
        summary[status as keyof typeof summary].totalAmount += apt.consultationFee || 0;
      }
    }

    res.status(200).json({
      status: "success",
      data: { summary },
    });
  } catch (error: any) {
    next(error);
  }
};

export const getAllDoctors = async (req: Request, res: Response, next: any) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const filter: any = { role: "DOCTOR" };
    if (status) filter.approvalStatus = status;
    
    const doctors = await UserModel.find(filter);
    doctors.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const paginatedDoctors = doctors.slice((Number(page) - 1) * Number(limit), Number(page) * Number(limit));
    
    const total = await UserModel.countDocuments(filter);
    
    const sanitized = paginatedDoctors.map((d: any) => {
      const { passwordHash, ...rest } = d;
      return rest;
    });

    res.status(200).json({
      status: "success",
      results: sanitized.length,
      data: { doctors: sanitized, total, page: Number(page), limit: Number(limit) },
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
    res.status(200).json({ status: "success", data: { doctor: rest } });
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
    res.status(200).json({ status: "success", data: { doctor: rest } });
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
    res.status(200).json({ status: "success", data: { doctor: rest } });
  } catch (error: any) {
    next(error);
  }
};

export const getDepartments = async (req: Request, res: Response, next: any) => {
  try {
    const doctors = await UserModel.find({ role: "DOCTOR" });
    const departments = [...new Set(doctors.map((d: any) => d.department).filter(Boolean))];

    res.status(200).json({
      status: "success",
      results: departments.length,
      data: { departments },
    });
  } catch (error: any) {
    next(error);
  }
};

export const getDepartmentStats = async (req: Request, res: Response, next: any) => {
  try {
    const { department } = req.params;
    const totalDoctors = await UserModel.countDocuments({ role: "DOCTOR", department, isActive: true });

    res.status(200).json({
      status: "success",
      data: { department, totalDoctors },
    });
  } catch (error: any) {
    next(error);
  }
};

export const getMedicalRecords = async (req: Request, res: Response, next: any) => {
  try {
    const { patientId } = req.query;
    const filter: any = {};
    if (patientId) filter.patient = patientId;
    
    const records = await AppointmentModel.find(filter);
    records.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const limitedRecords = records.slice(0, 50);
    
    res.status(200).json({
      status: "success",
      results: limitedRecords.length,
      data: { records: limitedRecords },
    });
  } catch (error: any) {
    next(error);
  }
};

export const getPrescriptions = async (req: Request, res: Response, next: any) => {
  try {
    const { patientId } = req.query;
    const filter: any = {};
    if (patientId) filter.patient = patientId;
    
    const records = await AppointmentModel.find(filter);
    records.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const limitedRecords = records.slice(0, 50);
    
    const prescriptions = limitedRecords
      .filter((r: any) => r.prescription && r.prescription.length > 0)
      .map((r: any) => ({
        _id: r._id,
        patient: r.patient,
        doctor: r.doctor,
        prescription: r.prescription,
        date: r.date,
        status: r.status,
      }));

    res.status(200).json({
      status: "success",
      results: prescriptions.length,
      data: { prescriptions },
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