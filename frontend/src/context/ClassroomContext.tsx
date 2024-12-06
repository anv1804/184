import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { message } from 'antd';
import { getAllClassTeaching } from '../services/TeacherService';

// Interface định nghĩa dữ liệu lớp
interface ClassroomData {
  id: string;
  className: string;
  studentCount: number;
  homeroomTeacher: string;
  subject: string;
  description: string;
}

// Context State
interface ClassroomContextState {
  classData: ClassroomData[];
  loading: boolean;
}

// Context và Provider
const ClassroomContext = createContext<ClassroomContextState | undefined>(undefined);

export const ClassroomProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [classData, setClassData] = useState<ClassroomData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await getAllClassTeaching();
        console.log("Dữ liệu từ API:", response);

        if (!response || !response.classes || !Array.isArray(response.classes)) {
          console.error("API không trả về một mảng, dữ liệu nhận được:", response);
          setClassData([]);
          message.error("Dữ liệu lớp học không hợp lệ.");
          return;
        }

        const formattedData = response.classes.map((item: any) => ({
          id: item._id,
          className: item.name,
          studentCount: item.students.length || 0,
          homeroomTeacher: item.homeroomTeacher?.name || 'Chưa cập nhật',
          subject: item.teachingSubject || 'Chưa cập nhật',
          description: item.academicYear || 'Chưa cập nhật',
        }));

        setClassData(formattedData);
        console.log("Dữ liệu đã chuyển đổi:", formattedData);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        message.error('Không thể tải thông tin lớp học.');
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, []);

  return (
    <ClassroomContext.Provider value={{ classData, loading }}>
      {children}
    </ClassroomContext.Provider>
  );
};

// Custom hook để sử dụng Context
export const useClassroomContext = () => {
  const context = useContext(ClassroomContext);
  if (!context) {
    throw new Error('useClassroomContext phải được sử dụng trong ClassroomProvider');
  }
  return context;
};
