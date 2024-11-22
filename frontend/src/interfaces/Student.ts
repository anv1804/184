export interface Student {
  _id: string;
  name: string;
  gender: string;
  dob: string;
  address: string;
  phone: string;
  email: string;
  photo: string;
  class_id: string;
  role: string;
  national_id: string;
  student_id: string;
  insurance: { health: string; life: string };
  parent_info: {
    name: string;
    phone: string;
    relation: string;
    address: string;
  }[];
  average_score: {
    weekly: number;
    monthly: number;
    subjects: { subject: string; average_score: number }[];
  };
  ranking: { class: number; school: number };
  violations: string[];
  rewards: string[];
  subject_scores_id: string;
}
