import React, { useState, useEffect } from "react";
import { Table, Input, Select, Button, Space, Modal, notification } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { getAllTeachers } from "../../../services/admin/adminTeacherService";
import { Link, useNavigate } from "react-router-dom";

const { Option } = Select;
const AdminTeacherManager: React.FC = () => {
    const [teachers, setTeachers] = useState<any[]>([]);
    const [filteredTeachers, setFilteredTeachers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [genderFilter, setGenderFilter] = useState("");
    const [onlineFilter, setOnlineFilter] = useState("");
    const [sortByRanking, setSortByRanking] = useState(false);
    const [sortByName, setSortByName] = useState(false);  // For sorting by name
    const navigate = useNavigate();

    // Fetch data from API
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await getAllTeachers();
                setTeachers(data);
                setFilteredTeachers(data);
            } catch (error) {
                console.error("Failed to load teachers:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Handle search by name
    const handleSearch = (value: string) => {
        setSearchText(value);
        const filtered = teachers.filter((teacher) =>
            teacher.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredTeachers(filtered);
    };

    // Handle filters
    const handleGenderFilter = (value: string) => {
        setGenderFilter(value);
        const filtered = teachers.filter((teacher) => teacher.gender === value || value === "");
        setFilteredTeachers(filtered);
    };

    const handleOnlineFilter = (value: string) => {
        setOnlineFilter(value);
        const filtered = teachers.filter(
            (teacher) => teacher.isOnline.toString() === value || value === ""
        );
        setFilteredTeachers(filtered);
    };

    // Toggle sort by pointRanking
    const handleSortRanking = () => {
        const sorted = [...filteredTeachers].sort((a, b) => b.pointRanking - a.pointRanking);
        setSortByRanking(!sortByRanking);
        setFilteredTeachers(sorted);
    };

    // Toggle sort by name
    const handleSortByName = () => {
        const sorted = [...filteredTeachers].sort((a, b) =>
            sortByName
                ? a.name.localeCompare(b.name)  // Sort ascending by name
                : b.name.localeCompare(a.name)  // Sort descending by name
        );
        setSortByName(!sortByName);
        setFilteredTeachers(sorted);
    };

    // Table columns
    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (_: any, __: any, index: number) => index + 1,  // Show the index (STT)
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (text: string) => (
                <img
                    src={text || "https://via.placeholder.com/50"}
                    alt="avatar"
                    style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", }}
                />
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text: string) => (
                <a onClick={handleSortByName}>{text}</a>  // Sort by name when clicked
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
            filters: [
                { text: "Male", value: "male" },
                { text: "Female", value: "female" },
                { text: "Other", value: "other" },
            ],
            onFilter: (value: any, record: any) => record.gender === value,
        },
        {
            title: "Online Status",
            dataIndex: "isOnline",
            key: "isOnline",
            render: (isOnline: boolean) => (isOnline ? "Online" : "Offline"),
        },
        {
            title: "Point Ranking",
            dataIndex: "pointRanking",
            key: "pointRanking",
            sorter: true, // Enable sorting
            render: (text: number) => <span>{text}</span>,
        },
        {
            title: "Actions",
            key: "actions",
            dataIndex: "_id",
            render: (_: any, record: any) => (
                <Space>
                    <Button icon={<EyeOutlined />} onClick={() => navigate(`/trang-ca-nhan/${record._id}`)} />
                    <Button icon={<EditOutlined />} onClick={() => console.log("Edit details:", record)} />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record._id)}
                        danger
                    />
                </Space>
            ),
        },
    ];

    // Delete teacher handler
    const handleDelete = (teacherId: string) => {
        Modal.confirm({
            title: "Are you sure you want to delete this teacher?",
            onOk: async () => {
                try {
                    // Call your delete API here, e.g., deleteTeacher(teacherId)
                    notification.success({ message: "Teacher deleted successfully!" });
                } catch (error) {
                    notification.error({ message: "Failed to delete teacher" });
                }
            },
        });
    };

    return (
        <>
            <section className="py-4 bg-white sm:py-6 lg:py-8">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="flex items-center justify-center">
                            <div className="w-20 h-20 -mr-6 overflow-hidden bg-gray-300 rounded-full">
                                <img
                                    className="object-cover w-full h-full"
                                    src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/female-avatar-1.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="relative overflow-hidden bg-gray-300 border-8 border-white rounded-full w-28 h-28">
                                <img
                                    className="object-cover w-full h-full"
                                    src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/male-avatar-1.jpg"
                                    alt=""
                                />
                            </div>
                            <div className="w-20 h-20 -ml-6 overflow-hidden bg-gray-300 rounded-full">
                                <img
                                    className="object-cover w-full h-full"
                                    src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/female-avatar-2.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                        <h2 className="mt-4 text-3xl font-bold leading-tight text-black lg:mt-6 sm:text-4xl lg:text-5xl">
                            Quản lý giáo viên <span className="border-b-8 border-yellow-300">2025</span>
                        </h2>
                        <p className="max-w-xl mx-auto mt-6 text-xl text-gray-600 md:mt-6">
                            Tổng số giáo viên đang họat động trong trường : {teachers?.length} giáo viên!
                        </p>
                        <Link
                            to={`/admin/giao-vien/them-moi`}
                            title=""
                            className="inline-flex items-center justify-center px-4 py-4 mt-2 font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:mt-6 hover:bg-blue-700 focus:bg-blue-700"
                            role="button"
                        >
                            <svg
                                className="w-5 h-5 mr-2 -ml-1"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            Thêm giáo viên
                        </Link>
                    </div>
                </div>
            </section>

            <div className="bg-white px-6">
                <Space style={{ marginBottom: 16 }}>
                    <Input
                        placeholder="Search by name"
                        value={searchText}
                        onChange={(e) => handleSearch(e.target.value)}
                        prefix={<SearchOutlined />}
                        style={{ width: 200 }}
                    />
                    <Select
                        placeholder="Filter by gender"
                        onChange={handleGenderFilter}
                        value={genderFilter}
                        style={{ width: 150 }}
                    >
                        <Option value="">All</Option>
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                    <Select
                        placeholder="Filter by online status"
                        onChange={handleOnlineFilter}
                        value={onlineFilter}
                        style={{ width: 150 }}
                    >
                        <Option value="">All</Option>
                        <Option value="true">Online</Option>
                        <Option value="false">Offline</Option>
                    </Select>
                    <Button onClick={handleSortRanking} type="primary">
                        Sort by Ranking {sortByRanking ? "Descending" : "Ascending"}
                    </Button>
                </Space>
                <Table
                    columns={columns}
                    dataSource={filteredTeachers}
                    loading={loading}
                    rowKey={(record) => record._id}
                    pagination={{ pageSize: 5 }}
                    onChange={(pagination, filters, sorter) => {
                        if (Array.isArray(sorter)) {
                            // If sorter is an array, handle sorting accordingly (if needed)
                            return;
                        }

                        if (sorter && sorter.field === "pointRanking") {
                            setFilteredTeachers(
                                [...filteredTeachers].sort((a, b) =>
                                    sorter.order === "ascend"
                                        ? a.pointRanking - b.pointRanking
                                        : b.pointRanking - a.pointRanking
                                )
                            );
                        }
                    }}
                />
            </div>
        </>
    );
};

export default AdminTeacherManager;
