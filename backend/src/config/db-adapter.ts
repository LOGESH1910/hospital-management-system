import { mockDB } from "./mock-db";
import { getDBStatus } from "./database";

let useMockDB = false;

export const setMockMode = (enabled: boolean) => {
  useMockDB = enabled;
};

const isMockMode = () => useMockDB || !getDBStatus().connected;

export const UserModel = {
  create: async (data: any) => {
    if (isMockMode()) {
      return mockDB.users.create(data);
    }
    const User = (await import("../models/user.model")).default;
    return User.create(data);
  },
  
  findOne: async (query: any, select?: string) => {
    if (isMockMode()) {
      return mockDB.users.findOne(query);
    }
    const User = (await import("../models/user.model")).default;
    return select ? User.findOne(query).select(select) : User.findOne(query);
  },
  
  findById: async (id: string) => {
    if (isMockMode()) {
      return mockDB.users.findById(id);
    }
    const User = (await import("../models/user.model")).default;
    return User.findById(id);
  },
  
  findByIdAndUpdate: async (id: string, update: any, options: any = {}) => {
    if (isMockMode()) {
      return mockDB.users.findByIdAndUpdate(id, update, options);
    }
    const User = (await import("../models/user.model")).default;
    return User.findByIdAndUpdate(id, update, options);
  },
  
  find: async (query: any = {}) => {
    if (isMockMode()) {
      return mockDB.users.find(query);
    }
    const User = (await import("../models/user.model")).default;
    return User.find(query);
  },
  
  countDocuments: async (query: any = {}) => {
    if (isMockMode()) {
      return mockDB.users.countDocuments(query);
    }
    const User = (await import("../models/user.model")).default;
    return User.countDocuments(query);
  },
  
  deleteMany: async (query: any = {}) => {
    if (isMockMode()) {
      return mockDB.users.deleteMany(query);
    }
    const User = (await import("../models/user.model")).default;
    return User.deleteMany(query);
  }
};

export const AppointmentModel = {
  create: async (data: any) => {
    if (isMockMode()) {
      return mockDB.appointments.create(data);
    }
    const Appointment = (await import("../models/appointment.model")).default;
    return Appointment.create(data);
  },
  
  findOne: async (query: any) => {
    if (isMockMode()) {
      return mockDB.appointments.findOne(query);
    }
    const Appointment = (await import("../models/appointment.model")).default;
    return Appointment.findOne(query);
  },
  
  findById: async (id: string) => {
    if (isMockMode()) {
      return mockDB.appointments.findById(id);
    }
    const Appointment = (await import("../models/appointment.model")).default;
    return Appointment.findById(id);
  },
  
  findByIdAndUpdate: async (id: string, update: any, options: any = {}) => {
    if (isMockMode()) {
      return mockDB.appointments.findByIdAndUpdate(id, update, options);
    }
    const Appointment = (await import("../models/appointment.model")).default;
    return Appointment.findByIdAndUpdate(id, update, options);
  },
  
  find: async (query: any = {}) => {
    if (isMockMode()) {
      return mockDB.appointments.find(query);
    }
    const Appointment = (await import("../models/appointment.model")).default;
    return Appointment.find(query);
  },
  
  countDocuments: async (query: any = {}) => {
    if (isMockMode()) {
      return mockDB.appointments.countDocuments(query);
    }
    const Appointment = (await import("../models/appointment.model")).default;
    return Appointment.countDocuments(query);
  },
  
  aggregate: async (pipeline: any[]) => {
    if (isMockMode()) {
      return mockDB.appointments.aggregate(pipeline);
    }
    const Appointment = (await import("../models/appointment.model")).default;
    return Appointment.aggregate(pipeline);
  }
};