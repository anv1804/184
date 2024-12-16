import React from 'react';
import { Table, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import { useClassroomContext } from '../context/ClassroomContext';

interface ClassroomData {
  id: string;
  className: string;
  studentCount: number;
  homeroomTeacher: string;
  subject: string;
  description: string;
}

const ClassroomTable: React.FC = () => {
  const { classData, loading } = useClassroomContext();
  const navigate = useNavigate();

  const columns: ColumnsType<ClassroomData> = [
    {
      title: 'STT',
      key: 'index',
      render: (_, __, index: number) => index + 1,
      align: 'center',
    },
    {
      title: 'Tên lớp',
      dataIndex: 'className',
      key: 'className',
      align: 'center',
    },
    {
      title: 'Sĩ số',
      dataIndex: 'studentCount',
      key: 'studentCount',
      align: 'center',
    },
    {
      title: 'GV Chủ nhiệm',
      dataIndex: 'homeroomTeacher',
      key: 'homeroomTeacher',
      align: 'center',
    },
    {
      title: 'Môn học',
      dataIndex: 'subject',
      key: 'subject',
      align: 'center',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: ClassroomData) => (
        <Button
          type="default"
          onClick={() => navigate(`/lop-hoc/${record.id}`)}
        >
          Xem lớp
        </Button>
      ),
      align: 'center',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={classData}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      loading={loading}
    />
  );
};

export default ClassroomTable;
