import instance from ".";
import { Student } from "../interfaces/Student";

export const fetchStudents = async (keyword: string) => {
  const response = await instance.get(`/api/students?keyword=${keyword}`);
  return response.data;
};
export const getUserById = async (id: string | number) => {
  try {
    const { data } : { data: Student } = await instance.get(`/api/users/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
