import React, { useState } from "react";
import { Button, Space, Modal, Upload, message } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const ClassActions: React.FC<any> = ({ record, navigate, handleDelete }) => {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        if (!file) {
            message.error("Vui lòng chọn file trước khi upload!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.put(`http://localhost:5000/api/classes/upload/${record._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            message.success("Tải lên thành công!");
        } catch (error) {
            message.error("Tải lên thất bại!");
        }
    };

    const props = {
        beforeUpload: (file: any) => {
            setFile(file);
            return false;
        },
        onRemove: () => {
            setFile(null);
        },
    };

    return (
        <Space>
            <Button icon={<EyeOutlined />} onClick={() => navigate(`/lop-hoc/${record._id}`)} />
            <Button icon={<EditOutlined />} />
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Chọn file Excel</Button>
            </Upload>
            <Button
                icon={<UploadOutlined />}
                onClick={handleUpload}
                disabled={!file}
            />
            <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record._id)}
                danger
            />
        </Space>
    );
};

export default ClassActions;
