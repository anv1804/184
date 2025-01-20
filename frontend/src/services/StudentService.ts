import instance from "."; // Adjust the import based on your project structure

export const fetchStudents = async () => {
  const response = await instance.get(`/api/users/`); // Fetch all users
  const students = response.data.filter((user: any) => user.role === 'student'); // Filter users by role
  return students; // Return only students
};

export const getStudentById = async (id: string | number) => {
  try {
    const { data } = await instance.get(`/api/users/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}; 