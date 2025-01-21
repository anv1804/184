import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Spin, Select, Button } from "antd";
import { getAllSubjects, createSubject, updateSubject } from "../../../services/admin/adminSubjectService";
import { Subject } from "../../../interfaces/Subject";

const AdminSubjectManager = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddModal, setIsAddModal] = useState(false); // Flag để phân biệt modal thêm mới và chỉnh sửa
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [form] = Form.useForm();
    const [statusFilter, setStatusFilter] = useState<string | undefined>("active");
    const [searchTerm, setSearchTerm] = useState<string>("");

    // Lấy danh sách các môn học từ API
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await getAllSubjects();
                setSubjects(data);
                setFilteredSubjects(data); // Đặt filteredSubjects bằng dữ liệu gốc ban đầu
            } catch (error) {
                console.error("Failed to load subjects:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Hiển thị modal khi nhấn vào item để chỉnh sửa
    const showModal = (subject: Subject) => {
        setIsAddModal(false); // Chỉnh sửa, không phải thêm mới
        setSelectedSubject(subject);
        form.setFieldsValue(subject);
        setIsModalVisible(true);
    };

    // Hiển thị modal để thêm môn học mới
    const showAddModal = () => {
        setIsAddModal(true); // Thêm mới, không phải chỉnh sửa
        form.resetFields(); // Reset form khi mở modal thêm mới
        setIsModalVisible(true);
    };

    // Hàm xử lý thêm môn học
    const handleAddSubject = async () => {
        setLoading(true);
        try {
            const values = form.getFieldsValue();
            await createSubject(values); // Gọi API thêm môn học
            setSubjects([...subjects, values]); // Thêm môn học mới vào danh sách
        } catch (error) {
            console.error("Failed to add subject:", error);
        } finally {
            setLoading(false);
            setIsModalVisible(false);
        }
    };

    // Hàm xử lý chỉnh sửa môn học
    const handleOk = async () => {
        setLoading(true);
        try {
            if (selectedSubject) {
                const values = form.getFieldsValue();
                const dataPost = {
                    name: values.name,
                    description: values.description,
                    status: values.status,
                };
                await updateSubject(String(selectedSubject._id), dataPost);
                setSubjects(subjects.map(subject =>
                    subject._id === selectedSubject._id ? { ...subject, ...dataPost } : subject
                ));
            }
        } catch (error) {
            console.error("Failed to update subject:", error);
        } finally {
            setLoading(false);
            setIsModalVisible(false);
        }
    };

    // Hàm xử lý khi bộ lọc theo status thay đổi
    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value);
    };

    // Hàm xử lý khi ô tìm kiếm tên thay đổi
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Lọc danh sách subjects theo status và tên
    useEffect(() => {
        let filtered = subjects;

        if (statusFilter) {
            filtered = filtered.filter(subject => subject.status === (statusFilter === "active"));
        }

        if (searchTerm) {
            filtered = filtered.filter(subject => String(subject.name).toLowerCase().includes(searchTerm.toLowerCase()));
        }

        setFilteredSubjects(filtered);
    }, [statusFilter, searchTerm, subjects]);

    // Hàm đóng modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight capitalize text-black sm:text-4xl lg:text-5xl">
                        Quản lý môn học
                    </h2>
                    <p className="max-w-lg mx-auto mt-4 text-base leading-relaxed text-gray-600">
                        Manage your subjects efficiently with easy status updates.
                    </p>
                </div>

                {/* Bộ lọc tìm kiếm */}
                <div className="flex justify-between mt-8 mb-4">
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="px-4 py-2 border rounded-md"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <Select
                            defaultValue="Active"
                            onChange={handleStatusFilterChange}
                            className="w-40"
                        >
                            <Select.Option value="active">Active</Select.Option>
                            <Select.Option value="inactive">Inactive</Select.Option>
                            <Select.Option value="">All Status</Select.Option>

                        </Select>
                    </div>

                    {/* Nút thêm môn học */}
                    <>
                        <button onClick={showAddModal} className="flex capitalize items-center px-4 py-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 text-white font-semibold text-xs rounded-full shadow-2xl hover:from-blue-600 hover:via-blue-700 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-70 active:bg-blue-800 active:shadow-inner transform hover:scale-110 transition duration-500 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ml-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                fill="none"
                                className="w-4 h-4 mr-2 text-white animate-pulse"
                            >
                                <path
                                    d="M12 4v16m8-8H4"
                                    strokeWidth={2}
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                />
                            </svg>
                            Thêm Mới
                        </button>
                    </>


                    {/* <Button type="text" className="btn btn-info btn-sm text-white hover" onClick={showAddModal}><span className="group-hover:text-blue-500">Thêm Môn Học</span></Button> */}
                </div>

                {/* Danh sách môn học */}
                <div className="grid grid-cols-1 gap-6 px-4 mt-12 sm:px-0 xl:mt-20 xl:grid-cols-4 sm:grid-cols-2">
                    {filteredSubjects.map((subject, index) => (
                        <div
                            key={index + 1}
                            className={`${subject.status ? "border-[1px]" : "border-[1px] border-red-100 opacity-40 hover:opacity-80"
                                } overflow-hidden bg-white rounded-md cursor-pointer hover:shadow-lg`}
                            onClick={() => showModal(subject)}
                        >
                            <div className="px-5 py-6">
                                <div className="flex items-center justify-between">
                                    <img
                                        className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
                                        src={`${subject?.image}` || "https://via.placeholder.com/150"}
                                        alt="Subject"
                                    />
                                    <div className="min-w-0 ml-3 mr-auto">
                                        <p className="text-base font-semibold text-black truncate">{subject.name}</p>
                                        <p className="text-sm text-gray-600 truncate">{subject.description || "No description"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal để thêm và chỉnh sửa môn học */}
            <Modal
                title={isAddModal ? "Add Subject" : "Edit Subject"}
                visible={isModalVisible}
                onOk={isAddModal ? handleAddSubject : handleOk}
                onCancel={handleCancel}
                confirmLoading={loading}
            >
                {loading ? (
                    <Spin tip="Processing...">
                        <div className="min-h-[200px]" />
                    </Spin>
                ) : (
                    <Form
                        form={form}
                        layout="vertical"
                        name="subject-form"
                    >
                        <Form.Item
                            name="name"
                            label="Subject Name"
                            rules={[{ required: true, message: "Please input the subject name!" }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item
                            name="status"
                            label="Status"
                            valuePropName="checked"
                        >
                            <input type="checkbox" />
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </section>
    );
};

export default AdminSubjectManager;
