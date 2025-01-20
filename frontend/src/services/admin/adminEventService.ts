import instance from "../"; // Adjust the import based on your project structure

export const getAllEvent = async () => {
  try {
    const { data } = await instance.get(`/api/events/`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
