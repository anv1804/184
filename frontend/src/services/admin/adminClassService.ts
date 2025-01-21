import instance from "../"; // Adjust the import based on your project structure

export const getAllClass = async () => {
  try {
    const { data } = await instance.get(`/api/classes/`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const createClass = async (dataPost: any) => {
  try {
    const { data } = await instance.post(`/api/classes/`, dataPost);
    return data;
  } catch (error) {
    console.log(error);
  }
};
