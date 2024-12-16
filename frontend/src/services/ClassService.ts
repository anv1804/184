import instance from ".";

// Thêm lớp mới
export const addClass = async (classData: any) => {
  try {
    const response = await instance.post(`/api/classes`, classData);
    return response.data;
  } catch (error) {
    console.error("Error adding class", error);
    throw error;
  }
};
