import React, { useState } from "react";
import { Button, message, Upload } from "antd";
import axios from "axios";
import { UploadOutlined } from '@ant-design/icons';

const UploadComponent: React.FC<any> = ({ classId }) => {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        if (!file) {
            message.error("Vui lòng chọn file trước khi upload!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.put(`http://localhost:5000/api/classes/upload/${classId}`, formData, {
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
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Chọn file Excel</Button>
        </Upload>
    );
};

export default UploadComponent;
