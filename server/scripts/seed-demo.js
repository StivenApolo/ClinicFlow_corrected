import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import redis from "../src/db/redis.js";
import Users from "../src/models/Users.model.js";
import Departments from "../src/models/Departments.model.js";
import Doctors from "../src/models/Doctors.model.js";
import Appointments from "../src/models/Appointments.model.js";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017";
const DB_NAME = "clinicFlow";
const DEMO_PASSWORD = "Clinic1234";
const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 12);

const avatar = (label) =>
  `https://placehold.co/400x400/png?text=${encodeURIComponent(label)}`;

const today = new Date();
today.setHours(0, 0, 0, 0);

const inDays = (days) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date;
};

const users = [
  {
    fullName: "ClinicFlow Admin",
    email: "admin@clinicflow.local",
    phoneNumber: "0999999999",
    password: passwordHash,
    role: "admin",
    image: {
      url: avatar("Admin"),
      publicId: "seed-admin"
    }
  },
  {
    fullName: "Front Desk Reception",
    email: "receptionist@clinicflow.local",
    phoneNumber: "0999999998",
    password: passwordHash,
    role: "receptionist",
    image: {
      url: avatar("Reception"),
      publicId: "seed-receptionist"
    }
  },
  {
    fullName: "Dr. Sofia Rivera",
    email: "sofia.rivera@clinicflow.local",
    phoneNumber: "0999999997",
    password: passwordHash,
    role: "doctor",
    image: {
      url: avatar("Sofia"),
      publicId: "seed-doctor-sofia"
    }
  },
  {
    fullName: "Dr. Mateo Alvarez",
    email: "mateo.alvarez@clinicflow.local",
    phoneNumber: "0999999996",
    password: passwordHash,
    role: "doctor",
    image: {
      url: avatar("Mateo"),
      publicId: "seed-doctor-mateo"
    }
  },
  {
    fullName: "Ana Torres",
    email: "ana.torres@clinicflow.local",
    phoneNumber: "0999999995",
    password: passwordHash,
    role: "patient",
    image: {
      url: avatar("Ana"),
      publicId: "seed-patient-ana"
    }
  },
  {
    fullName: "Luis Gomez",
    email: "luis.gomez@clinicflow.local",
    phoneNumber: "0999999994",
    password: passwordHash,
    role: "patient",
    image: {
      url: avatar("Luis"),
      publicId: "seed-patient-luis"
    }
  }
];

const departments = [
  {
    name: "Cardiology",
    description:
      "Heart and cardiovascular care focused on diagnosis, monitoring, and treatment."
  },
  {
    name: "Neurology",
    description:
      "Specialized care for the brain, spine, nerves, and neurological disorders."
  },
  {
    name: "Pediatrics",
    description:
      "Friendly medical care for children, infants, and adolescent patients."
  },
  {
    name: "Orthopedics",
    description:
      "Bone, joint, muscle, and injury treatment for movement and recovery."
  }
];

const doctorSchedules = [
  {
    fullName: "Dr. Sofia Rivera",
    email: "sofia.rivera@clinicflow.local",
    departmentName: "Cardiology",
    chamberNumber: "A-101",
    consultationFee: 40,
    slotDuration: 15,
    schedule: [
      { dayOfWeek: "Mon", startTime: "09:00", endTime: "13:00" },
      { dayOfWeek: "Tue", startTime: "09:00", endTime: "13:00" },
      { dayOfWeek: "Wed", startTime: "09:00", endTime: "13:00" },
      { dayOfWeek: "Thu", startTime: "09:00", endTime: "13:00" },
      { dayOfWeek: "Fri", startTime: "09:00", endTime: "13:00" }
    ]
  },
  {
    fullName: "Dr. Mateo Alvarez",
    email: "mateo.alvarez@clinicflow.local",
    departmentName: "Neurology",
    chamberNumber: "B-204",
    consultationFee: 55,
    slotDuration: 20,
    schedule: [
      { dayOfWeek: "Mon", startTime: "10:00", endTime: "15:00" },
      { dayOfWeek: "Tue", startTime: "10:00", endTime: "15:00" },
      { dayOfWeek: "Wed", startTime: "10:00", endTime: "15:00" },
      { dayOfWeek: "Thu", startTime: "10:00", endTime: "15:00" },
      { dayOfWeek: "Fri", startTime: "10:00", endTime: "15:00" }
    ]
  }
];

async function upsertUser(user) {
  return Users.findOneAndUpdate(
    { email: user.email },
    { $set: user },
    {
      upsert: true,
      returnDocument: "after",
      runValidators: true,
      setDefaultsOnInsert: true
    }
  );
}

async function upsertDepartment(department) {
  return Departments.findOneAndUpdate(
    { name: department.name },
    { $set: department },
    {
      upsert: true,
      returnDocument: "after",
      runValidators: true,
      setDefaultsOnInsert: true
    }
  );
}

async function upsertDoctor(doctor, userId, departmentId) {
  return Doctors.findOneAndUpdate(
    { userId },
    {
      $set: {
        userId,
        departmentId,
        chamberNumber: doctor.chamberNumber,
        consultationFee: doctor.consultationFee,
        slotDuration: doctor.slotDuration,
        schedule: doctor.schedule
      }
    },
    {
      upsert: true,
      returnDocument: "after",
      runValidators: true,
      setDefaultsOnInsert: true
    }
  );
}

async function upsertAppointment(appointment) {
  return Appointments.findOneAndUpdate(
    {
      doctorId: appointment.doctorId,
      patientId: appointment.patientId,
      date: appointment.date,
      slotStart: appointment.slotStart
    },
    { $set: appointment },
    {
      upsert: true,
      returnDocument: "after",
      runValidators: true,
      setDefaultsOnInsert: true
    }
  );
}

async function main() {
  await mongoose.connect(`${MONGODB_URL}/${DB_NAME}`);

  const departmentDocs = new Map();
  for (const department of departments) {
    const doc = await upsertDepartment(department);
    departmentDocs.set(doc.name.toLowerCase(), doc);
  }

  const userDocs = new Map();
  for (const user of users) {
    const doc = await upsertUser(user);
    userDocs.set(user.email, doc);
  }

  const doctorDocs = new Map();
  for (const doctor of doctorSchedules) {
    const userDoc = userDocs.get(doctor.email);
    const departmentDoc = departmentDocs.get(doctor.departmentName.toLowerCase());

    if (!userDoc) {
      throw new Error(`Missing user seed for ${doctor.fullName}`);
    }

    if (!departmentDoc) {
      throw new Error(`Missing department seed for ${doctor.departmentName}`);
    }

    const doc = await upsertDoctor(doctor, userDoc._id, departmentDoc._id);
    doctorDocs.set(doctor.fullName, doc);
  }

  const sofiaDoctor = doctorDocs.get("Dr. Sofia Rivera");
  const mateoDoctor = doctorDocs.get("Dr. Mateo Alvarez");
  const ana = userDocs.get("ana.torres@clinicflow.local");
  const luis = userDocs.get("luis.gomez@clinicflow.local");

  if (!sofiaDoctor || !mateoDoctor || !ana || !luis) {
    throw new Error("Missing doctor or patient seed records");
  }

  await Appointments.deleteMany({ qrHash: /^seed-demo-/ });

  const demoAppointments = [
    {
      doctorId: sofiaDoctor._id,
      patientId: ana._id,
      date: today,
      slotStart: "09:00",
      slotEnd: "09:15",
      status: "Done",
      qrHash: "seed-demo-sofia-ana-done",
      tokenNumber: 1,
      isSkipped: false,
      checkedIn: true
    },
    {
      doctorId: sofiaDoctor._id,
      patientId: luis._id,
      date: today,
      slotStart: "09:15",
      slotEnd: "09:30",
      status: "Pending",
      qrHash: "seed-demo-sofia-luis-pending",
      tokenNumber: 2,
      isSkipped: false,
      checkedIn: true
    },
    {
      doctorId: mateoDoctor._id,
      patientId: ana._id,
      date: inDays(1),
      slotStart: "10:00",
      slotEnd: "10:20",
      status: "Booked",
      qrHash: "seed-demo-mateo-ana-booked",
      tokenNumber: null,
      isSkipped: false,
      checkedIn: false
    }
  ];

  for (const appointment of demoAppointments) {
    await upsertAppointment(appointment);
  }

  const cachePatterns = [
    "allDepartments",
    "doctors:all",
    "Doctor:*",
    "departmentDoctors:*",
    "dashboard:*",
    "appointmentHistory:*",
    "appointment:*",
    "queue:*",
    "user:*",
    "userRegistration:*"
  ];

  for (const pattern of cachePatterns) {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(keys);
    }
  }

  console.log("Seed completed successfully.");
  console.log({
    users: userDocs.size,
    departments: departmentDocs.size,
    doctors: doctorDocs.size,
    appointments: demoAppointments.length,
    demoPassword: DEMO_PASSWORD
  });

  try {
    await redis.quit();
  } catch {
    redis.disconnect();
  }

  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error("Seed failed:", error);
  try {
    redis.disconnect();
  } catch {}
  try {
    await mongoose.disconnect();
  } catch {}
  process.exit(1);
});
