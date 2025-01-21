import React from "react";
import { Table, Button, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const ClassTable: React.FC<any> = ({ filteredClasses, loading, navigate, handleDelete }) => {
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (_: any, __: any, index: number) => index + 1,  // Show the index (STT)
        },
        {
            title: "Class Name",
            dataIndex: "name",
            key: "name",
            render: (text: string, record: any) => (
                <Link to={`/class/${record._id}`}>{text}</Link>
            ),
        },
        {
            title: "Students",
            dataIndex: "studentsCount",
            key: "studentsCount",
            render: (count: number) => count || 0,
        },
        {
            title: "Teacher",
            dataIndex: "homeroomTeacher",
            key: "homeroomTeacher",
            render: (teacher: any) => (
                teacher?.name ? <Link to={`/teacher/${teacher?._id}`}>{teacher?.name}</Link> : "No teacher assigned"
            ),
        },
        {
            title: "Grade",
            dataIndex: "grade",
            key: "grade",
            filters: [
                { text: "Grade 10", value: 10 },
                { text: "Grade 11", value: 11 },
                { text: "Grade 12", value: 12 },
            ],
            onFilter: (value: any, record: any) => record.grade === value,
        },
        {
            title: "Point Ranking",
            dataIndex: "pointRanking",
            key: "pointRanking",
            sorter: true,
            render: (text: number) => <span>{text}</span>,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: any) => (
                <Space>
                    <Button icon={<EyeOutlined />} onClick={() => navigate(`/class/${record._id}`)} />
                    <Button icon={<EditOutlined />} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} danger />
                </Space>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={filteredClasses}
            loading={loading}
            rowKey={(record) => record._id}
            pagination={{ pageSize: 10 }}
        />
    );
};

export default ClassTable;
