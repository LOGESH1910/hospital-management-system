import { Request, Response } from "express";
import { AppointmentModel, UserModel } from "../config/db-adapter";

export const getAllAppointments = async (req: Request, res: Response, next: any) => {
  try {
    const { status } = req.query;
    const userId = (req as any).user?.id;
    const filter: any = { patient: userId };

    if (status) {
      filter.status = Array.isArray(status) ? status[0] : status;
    }

    const appointments = await AppointmentModel.find(filter);
    
    for (const apt of appointments) {
      if (apt.doctor) {
        const doctor = await UserModel.findById(apt.doctor);
        if (doctor) {
          apt.doctor = { _id: doctor._id, name: doctor.name, specialization: doctor.specialization, profileImage: doctor.profileImage };
        }
      }
    }

    res.status(200).json({
      status: "success",
      results: appointments.length,
      data: { appointments },
    });
  } catch (error: any) {
    next(error);
  }
};

export const getAppointment = async (req: Request, res: Response, next: any) => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id as string);
    
    if (!appointment) {
      return res.status(404).json({ status: "fail", message: "Appointment not found" });
    }

    const userId = (req as any).user?.id;
    const userRole = (req as any).user?.role;

    if (appointment.patient.toString() !== userId && userRole !== "ADMIN") {
      return res.status(403).json({ status: "fail", message: "Not authorized to view this appointment" });
    }

    if (appointment.patient) {
      const patient = await UserModel.findById(appointment.patient);
      if (patient) {
        appointment.patient = { _id: patient._id, name: patient.name, email: patient.email };
      }
    }
    if (appointment.doctor) {
      const doctor = await UserModel.findById(appointment.doctor);
      if (doctor) {
        appointment.doctor = { _id: doctor._id, name: doctor.name, specialization: doctor.specialization, profileImage: doctor.profileImage };
      }
    }

    res.status(200).json({
      status: "success",
      data: { appointment },
    });
  } catch (error: any) {
    next(error);
  }
};

export const bookAppointment = async (req: Request, res: Response, next: any) => {
  try {
    const { doctorId, date, time, reason } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ status: "fail", message: "Missing required fields: doctorId, date, time" });
    }

    const doctor = await UserModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ status: "fail", message: "Doctor not found" });
    }
    if (!doctor.isActive) {
      return res.status(400).json({ status: "fail", message: "Doctor is not active" });
    }
    if (doctor.approvalStatus !== "APPROVED" && (req as any).user?.role !== "ADMIN") {
      return res.status(400).json({ status: "fail", message: "Doctor is not approved" });
    }

    const existingAppointment = await AppointmentModel.findOne({
      doctor: doctorId,
      date,
      status: { $ne: "CANCELLED" },
    });

    if (existingAppointment && existingAppointment.time === time) {
      return res.status(400).json({ status: "fail", message: "This time slot is already booked. Please select another slot." });
    }

    const appointment = await AppointmentModel.create({
      patient: (req as any).user?.id,
      doctor: doctorId,
      date,
      time,
      reason,
      status: "PENDING",
      consultationFee: doctor.consultationFee,
    });

    res.status(201).json({
      status: "success",
      data: { appointment },
    });
  } catch (error: any) {
    next(error);
  }
};

export const cancelAppointment = async (req: Request, res: Response, next: any) => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id as string);

    if (!appointment) {
      return res.status(404).json({ status: "fail", message: "Appointment not found" });
    }

    const userId = (req as any).user?.id;
    const userRole = (req as any).user?.role;

    if (appointment.patient.toString() !== userId && userRole !== "ADMIN") {
      return res.status(403).json({ status: "fail", message: "Not authorized to cancel this appointment" });
    }

    appointment.status = "CANCELLED";
    await AppointmentModel.findByIdAndUpdate(req.params.id as string, { status: "CANCELLED" });

    res.status(200).json({
      status: "success",
      data: { appointment },
    });
  } catch (error: any) {
    next(error);
  }
};

export const requestReschedule = async (req: Request, res: Response, next: any) => {
  try {
    const appointment = await AppointmentModel.findById(req.params.id as string);

    if (!appointment) {
      return res.status(404).json({ status: "fail", message: "Appointment not found" });
    }

    const userId = (req as any).user?.id;
    const userRole = (req as any).user?.role;

    if (appointment.patient.toString() !== userId && userRole !== "ADMIN") {
      return res.status(403).json({ status: "fail", message: "Not authorized to reschedule this appointment" });
    }

    const { newDate, newTime } = req.body;
    if (!newDate || !newTime) {
      return res.status(400).json({ status: "fail", message: "New date and time are required" });
    }

    await AppointmentModel.findByIdAndUpdate(req.params.id as string, {
      date: newDate,
      time: newTime,
      status: "PENDING",
    });

    res.status(200).json({
      status: "success",
      data: { appointment: { ...appointment, date: newDate, time: newTime, status: "PENDING" } },
    });
  } catch (error: any) {
    next(error);
  }
};