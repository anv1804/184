import React, { useEffect, useState } from 'react';
import { Table, Spin, Button } from 'antd';
import axios from 'axios';

const AdminClassManager: React.FC = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/classes'); // Fetch classes from the API
        setClasses(response.data); // Set the classes state with the fetched data
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchClasses();
  }, []);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1, // Serial number
    },
    {
      title: 'Class Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Number of Students',
      dataIndex: 'students',
      key: 'students',
    },
    {
      title: 'Head Teacher',
      dataIndex: 'teacher',
      key: 'teacher',
    },
    {
      title: 'Ranking',
      dataIndex: 'ranking',
      key: 'ranking',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => handleViewDetails(record)}>View Details</Button>
      ),
    },
  ];

  const handleViewDetails = (record: any) => {
    // Implement the logic to view class details
    console.log('Viewing details for:', record);
  };

  if (loading) {
    return <Spin size="large" />; // Show a loading spinner while fetching data
  }

  return (
    <div className="p-4">
      
      <h2 className="text-lg font-bold mb-4">All Classes</h2>
      <Table dataSource={classes} columns={columns} rowKey="id" />
    </div>
  );
};

export default AdminClassManager; 