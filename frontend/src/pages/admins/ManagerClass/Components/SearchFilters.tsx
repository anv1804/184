import React from "react";
import { Input, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const SearchFilters: React.FC<any> = ({ classes, setFilteredClasses }) => {
    const handleSearchByClassName = (value: string) => {
        const filtered = classes.filter((cls:any) =>
            cls.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredClasses(filtered);
    };

    const handleSearchByTeacherName = (value: string) => {
        const filtered = classes.filter((cls:any) =>
            cls?.homeroomTeacher?.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredClasses(filtered);
    };

    const handleGradeFilter = (value: string) => {
        const filtered = classes.filter((cls:any) => cls.grade === value || value === "");
        setFilteredClasses(filtered);
    };

    return (
        <Space style={{ marginBottom: 16 }}>
            <Input
                placeholder="Tìm kiếm theo tên lớp"
                onChange={(e) => handleSearchByClassName(e.target.value)}
                prefix={<SearchOutlined />}
                style={{ width: 200 }}
            />
            <Input
                placeholder="Tìm kiếm theo tên giáo viên"
                onChange={(e) => handleSearchByTeacherName(e.target.value)}
                prefix={<SearchOutlined />}
                style={{ width: 220 }}
            />
            <Select
                placeholder="Lọc Theo Khối"
                onChange={handleGradeFilter}
                style={{ width: 150 }}
            >
                <Option value="">Tất cả</Option>
                <Option value={10}>Khối 10</Option>
                <Option value={11}>Khối 11</Option>
                <Option value={12}>Khối 12</Option>
            </Select>
        </Space>
    );
};

export default SearchFilters;
