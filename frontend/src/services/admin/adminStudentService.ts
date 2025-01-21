import instance from "..";

export const getStudentById = async (id: any) => {
  try {
    const response = await instance.get(`/api/students/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
