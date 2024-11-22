import React, { useState } from 'react';
import { Table, Input, Select, Button, Space, Avatar } from 'antd';
import { MessageOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;
const { Option } = Select;

const Classroom = () => {
  const navigate = useNavigate();

  // Sample data
  const classData = [
    {
      id: '1',
      name: 'Class 10A',
      size: 30,
      homeroomTeacher: 'Mr. John',
      periods: 20,
      subject: 'Math',
      type: 10,
      students: [
        {
          id: 'stu1',
          name: 'Alice Johnson',
          studentCode: 'S001',
          gender: 'Female',
          dob: '2006-05-15',
          avatar: 'https://via.placeholder.com/50',
        },
        {
          id: 'stu2',
          name: 'Bob Smith',
          studentCode: 'S002',
          gender: 'Male',
          dob: '2006-08-20',
          avatar: 'https://via.placeholder.com/50',
        },
      ],
    },
    {
      id: '2',
      name: 'Class 11B',
      size: 25,
      homeroomTeacher: 'Ms. Jane',
      periods: 22,
      subject: 'Physics',
      type: 11,
      students: [
        {
          id: 'stu3',
          name: 'Charlie Brown',
          studentCode: 'S003',
          gender: 'Male',
          dob: '2005-02-10',
          avatar: 'https://via.placeholder.com/50',
        },
        {
          id: 'stu4',
          name: 'Daisy Parker',
          studentCode: 'S004',
          gender: 'Female',
          dob: '2005-12-25',
          avatar: 'https://via.placeholder.com/50',
        },
      ],
    },
  ];

  const [filteredClasses, setFilteredClasses] = useState(classData);
  const [selectedClass, setSelectedClass] = useState<any | null>(null);
  const [classType, setClassType] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle filters
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterClasses(value, classType);
  };

  const handleClassTypeChange = (value: number | null) => {
    setClassType(value);
    filterClasses(searchTerm, value);
  };

  const filterClasses = (search: string, type: number | null) => {
    const filtered = classData.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (type === null || item.type === type)
    );
    setFilteredClasses(filtered);
  };

  const handleViewClass = (record: any) => {
    setSelectedClass(record);
  };

  // Define table columns for classes
  const classColumns = [
    {
      title: 'Class Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: 'Class Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Homeroom Teacher',
      dataIndex: 'homeroomTeacher',
      key: 'homeroomTeacher',
    },
    {
      title: 'Periods',
      dataIndex: 'periods',
      key: 'periods',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => handleViewClass(record)}>
          View
        </Button>
      ),
    },
  ];

  // Define table columns for students
  const studentColumns = [
    {
      title: 'STT',
      key: 'stt',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string) => <Avatar src={avatar} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Student Code',
      dataIndex: 'studentCode',
      key: 'studentCode',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space size="middle">
          <MessageOutlined
            style={{ color: '#1890ff', cursor: 'pointer' }}
            onClick={() => alert(`Chat with ${record.name}`)}
          />
          <EyeOutlined
            style={{ color: '#1890ff', cursor: 'pointer' }}
            onClick={() => navigate(`/student/${record.id}`)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className='p-4'>
      <h2>Classroom Management</h2>
      <Space style={{ marginBottom: 16 }} direction="vertical" size="middle">
        <Space>
          <Search
            placeholder="Search by class name"
            allowClear
            onSearch={handleSearch}
            style={{ width: 200 }}
          />
          <Select
            placeholder="Select class type"
            allowClear
            onChange={handleClassTypeChange}
            style={{ width: 150 }}
          >
            <Option value={10}>10</Option>
            <Option value={11}>11</Option>
            <Option value={12}>12</Option>
          </Select>
        </Space>
      </Space>
      <Table
        dataSource={filteredClasses}
        columns={classColumns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      {selectedClass && (
        <div className='pt-6 border-t-[1px] shadow-lg'>
          <h3>Students in {selectedClass.name}</h3>
          <Table
            dataSource={selectedClass.students}
            columns={studentColumns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            className='min-h-[40vh]'
          />
        </div>
      )}
    </div>
  );
};

export default Classroom;
