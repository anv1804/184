import { Student } from "./Student";

// export interface Class {
//     _id: string;
//     name: string;
//     homeroom_teacher: HomeroomTeacher;
//     student_list: { _id: string; name: string }[];
//     room_code: string;
//     competitive_points: number;
//     rank: number;
// }
interface HomeroomTeacher {
  _id: string;
  name: string;
  email: string;
}
export interface Classroom {
  _id: string;
  name: string;
  students: Student[];
  homeroomTeacher: HomeroomTeacher;
  subjects: {
    subject: {
      _id: string;
      name: string;
    } | null;
    teacher: string;
    _id: string;
  }[];
}
