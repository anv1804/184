import instance from ".";

export const getAllClassTeaching = async () => {
  try {
    const { data } = await instance.get(`/api/users/classes`);
    return data;
  } catch (error) {
    console.log(error);
  }
};