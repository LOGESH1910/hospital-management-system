const users: Map<string, any> = new Map();
const appointments: Map<string, any> = new Map();

let userIdCounter = 1;
let appointmentIdCounter = 1;

const generateId = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const mockDB = {
  users: {
    create: async (data: any) => {
      const id = generateId("user");
      const user = { 
        _id: id, 
        ...data, 
        createdAt: new Date(), 
        updatedAt: new Date(),
        toJSON: function() { return { ...this }; },
        toObject: function() { return { ...this }; }
      };
      users.set(id, user);
      return user;
    },
    findOne: async (query: any) => {
      for (const user of users.values()) {
        let match = true;
        for (const [key, value] of Object.entries(query)) {
          if (user[key] !== value) {
            match = false;
            break;
          }
        }
        if (match) return user;
      }
      return null;
    },
    findById: async (id: string) => {
      return users.get(id) || null;
    },
    findByIdAndUpdate: async (id: string, update: any, options: any = {}) => {
      const user = users.get(id);
      if (!user) return null;
      const updated = { ...user, ...update, updatedAt: new Date() };
      users.set(id, updated);
      return options.new ? updated : user;
    },
    find: async (query: any = {}) => {
      const results = [];
      for (const user of users.values()) {
        let match = true;
        for (const [key, value] of Object.entries(query)) {
          if (user[key] !== value) {
            match = false;
            break;
          }
        }
        if (match) results.push(user);
      }
      return results;
    },
    countDocuments: async (query: any = {}) => {
      let count = 0;
      for (const user of users.values()) {
        let match = true;
        for (const [key, value] of Object.entries(query)) {
          if (user[key] !== value) {
            match = false;
            break;
          }
        }
        if (match) count++;
      }
      return count;
    },
    deleteMany: async (query: any = {}) => {
      let count = 0;
      for (const [id, user] of users.entries()) {
        let match = true;
        for (const [key, value] of Object.entries(query)) {
          if (user[key] !== value) {
            match = false;
            break;
          }
        }
        if (match) {
          users.delete(id);
          count++;
        }
      }
      return { deletedCount: count };
    }
  },
  
  appointments: {
    create: async (data: any) => {
      const id = generateId("apt");
      const apt = { 
        _id: id, 
        ...data, 
        createdAt: new Date(), 
        updatedAt: new Date(),
        populate: async function(path: string) {
          if (path === 'doctor') {
            this.doctor = await mockDB.users.findById(this.doctor);
          } else if (path === 'patient') {
            this.patient = await mockDB.users.findById(this.patient);
          }
          return this;
        },
        toJSON: function() { return { ...this }; },
        toObject: function() { return { ...this }; }
      };
      appointments.set(id, apt);
      return apt;
    },
    findOne: async (query: any) => {
      for (const apt of appointments.values()) {
        let match = true;
        for (const [key, value] of Object.entries(query)) {
          if (apt[key] !== value) {
            match = false;
            break;
          }
        }
        if (match) return apt;
      }
      return null;
    },
    findById: async (id: string) => {
      return appointments.get(id) || null;
    },
    findByIdAndUpdate: async (id: string, update: any, options: any = {}) => {
      const apt = appointments.get(id);
      if (!apt) return null;
      const updated = { ...apt, ...update, updatedAt: new Date() };
      appointments.set(id, updated);
      return options.new ? updated : apt;
    },
    find: async (query: any = {}) => {
      const results = [];
      for (const apt of appointments.values()) {
        let match = true;
        for (const [key, value] of Object.entries(query)) {
          if (apt[key] !== value) {
            match = false;
            break;
          }
        }
        if (match) results.push(apt);
      }
      return results;
    },
    countDocuments: async (query: any = {}) => {
      let count = 0;
      for (const apt of appointments.values()) {
        let match = true;
        for (const [key, value] of Object.entries(query)) {
          if (apt[key] !== value) {
            match = false;
            break;
          }
        }
        if (match) count++;
      }
      return count;
    },
    aggregate: async (pipeline: any[]) => {
      const results = [];
      for (const apt of appointments.values()) {
        results.push(apt);
      }
      return results;
    }
  },
  
  clear: () => {
    users.clear();
    appointments.clear();
    userIdCounter = 1;
    appointmentIdCounter = 1;
  }
};