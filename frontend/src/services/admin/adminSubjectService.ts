import instance from "../"; // Adjust the import based on your project structure
import { Subject } from "../../interfaces/Subject";

export const getAllSubjects = async () => {
  try {
    const { data } = await instance.get(`/api/subjects/`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getSubjectById = async (id: string | number) => {
  try {
    const { data } = await instance.get(`/api/subjects/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const createSubject = async (dataPost: Subject) => {
  try {
    const { data } = await instance.post(`/api/subjects/`, dataPost);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateSubject = async (id: string | number, dataPost: object) => {
  try {
    const { data } = await instance.put(`/api/subjects/${id}`, dataPost);
    return data;
  } catch (error) {
    console.log(error);
  }
};
