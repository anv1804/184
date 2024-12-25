export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  isOnline?: boolean;
}

export interface Subject {
  _id: string;
  name: string;
  // Add other properties if needed
}

export interface Grade {
  student: User;
  subject: Subject;
  class: string;
  semester: number;
  scores: {
    coefficient1: number[];
    coefficient2: number[];
    coefficient3: number[];
  };
  average?: number;
} 