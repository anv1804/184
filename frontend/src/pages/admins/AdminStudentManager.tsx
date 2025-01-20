import React, { useEffect, useState } from 'react';
import { fetchStudents } from '../../services/StudentService'; // Import the fetchStudents function
import { Student } from '../../interfaces/Student'; // Import the Student interface
import { Table, Input, Select } from 'antd'; // Import Ant Design components
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select; // Destructure Option from Select

const AdminStudentManager = () => {
  const [students, setStudents] = useState<Student[]>([]); // State to hold student data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error messages
  const [searchText, setSearchText] = useState<string>(''); // State for search input
  const [selectedGender, setSelectedGender] = useState<string | undefined>(undefined); // State for gender filter

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudents(); // Call the fetchStudents function
        setStudents(data); // Set the fetched data to state
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // Set error message if fetch fails
        } else {
          setError("An unknown error occurred"); // Fallback for unknown errors
        }
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    loadStudents(); // Call the loadStudents function
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error message

  // Filter students based on search text and selected gender
  const filteredStudents = students.filter(student => {
    const matchesName = student.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesGender = selectedGender ? student.gender === selectedGender : true;
    return matchesName && matchesGender;
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text: string) => <img src={text} alt="avatar" style={{ width: 50, borderRadius: '50%' }} />,
    },
  ];

  return (
    <div className="m-5">
      <Input
        placeholder="Search by name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
        prefix={<SearchOutlined />}
      />
      <Select
        placeholder="Filter by gender"
        onChange={(value) => setSelectedGender(value)}
        style={{ width: 200, marginBottom: 16 }}
        allowClear
      >
        <Option value="male">Male</Option>
        <Option value="female">Female</Option>
        <Option value="other">Other</Option>
      </Select>
      <Table
        dataSource={filteredStudents}
        columns={columns}
        rowKey="_id"
        pagination={{ pageSize: 5 }} // Adjust page size as needed
      />
    </div>
  );
};

export default AdminStudentManager;
