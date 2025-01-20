import instance from "../";

// GET ALL TEACHER
export const getAllTeachers = async () => {
  try {
    const response = await instance.get("/api/teachers");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllClassTeacherTeaching = async () => {
  try {
    const { data } = await instance.get(`/api/teachers/classteacherteaching`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getFreeTeachers = async () => {
  try {
    const response = await instance.get("/api/teachers/free");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
