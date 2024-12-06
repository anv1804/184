import { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "teacher" | "student";
  avatar?: string;
  age?: number;
  gender?: string;
  description?: string;
  identityCard?: string;
  socialInsurance?: string; // Chỉ giáo viên
  bankAccount?: string; // Chỉ giáo viên
  teachingSubject?: Types.ObjectId; // Giáo viên
  homeroomClass?: Types.ObjectId; // Giáo viên
  studentClass?: Types.ObjectId; // Học sinh
  academicYear?: string;
}
