import React, { useState } from "react";
import { Checkbox, Form, Select, message, Modal } from "antd";

import { Link } from "react-router-dom";
import { forEachChild } from "typescript";
import { createClass } from "../../../services/admin/adminClassService";

const AdminClassCreate: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        const grade = values.grade;
        const name = values.name;
        let classes = [] as any;
        grade.forEach((item1: any) => {
            name.forEach((item2: any) => {
                let nameChild: any = `${item1}${item2}`;
                let gradeChild: number = Number(item1);
                let data = {
                    name: nameChild,
                    grade: gradeChild
                }
                classes.push(data);
                
            });
        });
        console.log(classes);

        values = { classes, ...values };
        console.log(values);

        // Xác nhận trước khi gửi
        Modal.confirm({
            title: 'Xác nhận',
            content: 'Bạn có chắc chắn muốn tạo các lớp này không?',
            okText: 'Xác nhận',
            cancelText: 'Hủy',
            async onOk() {
                try {
                    // Gửi dữ liệu tới backend
                    const data = await createClass(values);
                    if (data) {
                        message.success('Tạo lớp thành công!');
                    }
                } catch (error) {
                    message.error('Đã xảy ra lỗi khi tạo lớp');
                }
            },
            onCancel() {
                console.log('Người dùng đã hủy hành động');
            },
        });
    };
    return (
        <>
            <div className="h-screen bg-white py-6 px-4 shadow-sm">
                <h1 className="text-center mb-[24px] text-2xl font-bold capitalize text-blue-600" >
                    Thêm Mới Lớp Học
                </h1>

                <Form
                    // {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                    className="w-full"
                >
                    <Form.Item
                        name="name"
                    // rules={[{ required: true, whitespace: true }]}
                    >
                        <Select
                            prefix="Lớp"
                            defaultValue={['A1']}
                            mode="multiple"
                            options={[
                                { value: 'A1', label: 'A1' },
                                { value: 'A2', label: 'A2' },
                                { value: 'A3', label: 'A3' },
                                { value: 'A4', label: 'A4' },
                                { value: 'A5', label: 'A5' },
                                { value: 'A6', label: 'A6' },
                                { value: 'A7', label: 'A7' },
                                { value: 'A8', label: 'A8' },
                                { value: 'A9', label: 'A9' },
                                { value: 'A10', label: 'A10' },
                                { value: 'A11', label: 'A11' },
                                { value: 'A12', label: 'A12' },
                                { value: 'A13', label: 'A13' },
                                { value: 'A14', label: 'A14' },
                                { value: 'disabled', label: 'B1', disabled: true },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name="grade"
                        rules={[{ required: true, message: "Please select gender!" }]}
                    >
                        <Select
                            prefix="Khối"
                            defaultValue={[10]}
                            mode="multiple"
                            options={[
                                {
                                    value: 10,
                                    label: '10',
                                },
                                {
                                    value: 11,
                                    label: '11',
                                },
                                {
                                    value: 12,
                                    label: '12',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement")) }]}
                    >
                        <Checkbox>
                            <span className="text-sm ">I have read the </span><Link to="" className="font-semibold underline text-blue-600">Agreement</Link>
                        </Checkbox>
                    </Form.Item>

                    <Form.Item >

                        <button
                            data-ripple-light="true"
                            type="submit"
                            className="block w-full select-none rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                            Sign In
                        </button>

                    </Form.Item>
                </Form>
            </div></>
    );
};

export default AdminClassCreate;
