import instance from ".";

export const getAllClassTeaching = async () => {
  try {
    const { data } = await instance.get(`/api/users/classes`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getTeachers = async () => {
  try {
    const response = await instance.get("/api/teachers");
    return response.data;
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

