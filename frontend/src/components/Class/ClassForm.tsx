import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Modal, Spin, Radio } from "antd";
import { addClass } from "../../services/ClassService";
import { fetchStudents } from "../../services/UserService";
import { getTeachers, getFreeTeachers } from "../../services/TeacherService";
import { debounce } from "lodash";
const { Option } = Select;

const ClassForm: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [teachers, setTeachers] = useState([]); // List of teachers
  const [students, setStudents] = useState([]);
  const [studentLoading, setStudentLoading] = useState(false);

  const [isFreeTeacherMode, setIsFreeTeacherMode] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<string | undefined>(undefined);

  // Fetch teachers
  const fetchTeachersList = async () => {
    try {
      const data = isFreeTeacherMode ? await getFreeTeachers() : await getTeachers();
      setTeachers(data);

      if (selectedTeacher && !data.find((teacher: any) => teacher.id === selectedTeacher)) {
        setSelectedTeacher(undefined);
      }
    } catch (error) {
      console.error("Error fetching teachers", error);
    }
  };

  useEffect(() => {
    fetchTeachersList();
  }, [isFreeTeacherMode]);

  const handleRadioChange = (e: any) => {
    const isFreeMode = e.target.value === "free";
    setIsFreeTeacherMode(isFreeMode);
  };

  const handleTeacherChange = (value: string | undefined) => {
    setSelectedTeacher(value);
  };

  // Debounced version of search
  const debouncedSearchStudents = debounce(async (keyword: string) => {
    setStudentLoading(true);
    try {
      const data = await fetchStudents(keyword);
      setStudents(data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    } finally {
      setStudentLoading(false);
    }
  }, 300); // Wait 300ms after the user stops typing

  const handleSearchStudents = (keyword: string) => {
    debouncedSearchStudents(keyword);
  };

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await addClass(values);
      Modal.success({
        title: "Success",
        content: "Class added successfully",
      });
      form.resetFields();
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "Could not add class",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-5 shadow-lg bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Class</h2>
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        {/* Input for Class Name */}
        <Form.Item
          label="Class Name"
          name="name"
          rules={[{ required: true, message: "Please input the class name" }]}
        >
          <Input placeholder="Enter class name" />
        </Form.Item>

        {/* Select for Homeroom Teacher */}
        <Form.Item
          label={<span className="font-semibold">Giáo Viên Chủ Nhiệm</span>}
          name="homeroomTeacher"
          rules={[{ required: true, message: "Please select a homeroom teacher" }]}
        >
          <Radio.Group onChange={handleRadioChange} value={isFreeTeacherMode ? "free" : "all"}>
            <Radio.Button value="all">Tất cả giáo viên</Radio.Button>
            <Radio.Button value="free">Giáo viên chưa có lớp</Radio.Button>
          </Radio.Group>
          <Select
            placeholder="Chọn giáo viên chủ nhiệm"
            showSearch
            className="mt-3"
            value={selectedTeacher}
            onChange={handleTeacherChange}
            notFoundContent="No teacher found"
          >
            {teachers.map((teacher: any) => (
              <Option key={teacher._id} value={teacher._id}>
                {teacher.name} 
                {/* {teacher.homeroomClass ? `(${teacher.homeroomClass})` : "(Chưa có lớp)"} */}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Select for Students */}
        <Form.Item label="Students" name="students">
          <Select
            mode="multiple"
            placeholder="Search and select students"
            onSearch={handleSearchStudents}
            notFoundContent={studentLoading ? <Spin size="small" /> : "No students found"}
            filterOption={false}
            showSearch
          >
            {students.map((student: any) => (
              <Option key={student._id} value={student._id}>
                {student.name} ({student.id})
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Submit button */}
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ClassForm;
