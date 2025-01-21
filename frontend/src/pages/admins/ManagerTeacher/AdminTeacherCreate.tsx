import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Select, Upload, message, Row, Col, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import bcrypt from 'bcryptjs';
import { Link } from "react-router-dom";
import EmailInput from "../../../components/element/Inputs/EmailInput";
import TextInput from "../../../components/element/Inputs/TextInput";
import PhoneInput from "../../../components/element/Inputs/PhoneInput";
import PassInput from "../../../components/element/Inputs/PassInput";
import GenderSelect from "../../../components/element/Inputs/GenderSelect";
import TextArea from "../../../components/element/Inputs/TextArea";

const { Option } = Select;
const { Title } = Typography;
const AdminTeacherCreate: React.FC = () => {
    const [form] = Form.useForm();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const onFinish = async (values: any) => {
        console.log('Form Submitted:', values); // Check if the form is submitting
        const { password } = values;
        try {
            console.log(1234);

            // Hash the password before sending it to the backend
            const hashedPassword = await bcrypt.hash(password, 10);
            // Replace password with hashed password in values object
            const dataToSend = { ...values, password: hashedPassword };
            console.log("Sending values to backend: ", dataToSend);
            // Proceed with sending data to your backend
        } catch (error) {
            message.error("Password hashing failed");
        }
    };

    const handleAvatarChange = (info: any) => {
        if (info.file.status === "done") {
            // Convert file to a Base64 URL for preview
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarUrl(reader.result as string);
            };
            reader.readAsDataURL(info.file.originFileObj);
        }
    };

    return (
        <>
            <section className="pt-10 bg-amber-400 2xl:py-24 2xl:bg-white sm:pt-16 md:pt-0">
                <div className="px-4 mx-auto rounded-md bg-amber-400 max-w-7xl sm:px-6 lg:px-8">
                    <div className="2xl:pl-24">
                        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 2xl:gap-x-20">
                            <div className="text-center md:py-6 xl:py-8 md:text-left">
                                <blockquote>
                                    <p className="text-2xl font-semibold leading-relaxed text-gray-900">
                                        “Giáo dục là một trong những nhiệm vụ quan trọng nhất của Đảng Cộng sản, vì giáo dục là cơ sở của sự thay đổi mọi người, cơ sở của sự nâng cao trình độ tư tưởng và đạo đức của dân.”
                                    </p>
                                </blockquote>
                                <div className="mt-6 sm:flex sm:items-baseline sm:justify-center md:justify-start">
                                    <p className="text-base font-semibold text-gray-900">
                                        Hồ Chí Minh
                                    </p>
                                    <p className="mt-2 text-base text-gray-700 sm:mt-0 sm:ml-2">
                                        - Lãnh Tụ Vĩ Đại Của Dân Tộc Việt Nam
                                    </p>
                                </div>
                                <p className="mt-2 text-base text-gray-900 lg:mt-4">
                                    Want to see Celebration in action?
                                </p>
                                <Link
                                    to={`/admin/giao-vien`}
                                    title=""
                                    className="inline-flex items-center justify-center px-8 py-4 mt-4 text-base font-semibold text-white transition-all duration-200 bg-black rounded-md hover:opacity-80 focus:opacity-80"
                                    role="button"
                                >
                                    Xem Các Giáo Viên Đang Hoạt Động
                                </Link>
                            </div>
                            <div className="relative">
                                <img
                                    className="md:absolute md:bottom-[10%]  md:scale-110 md:origin-bottom-right lg:scale-75 2xl:scale-100 2xl:-mt-20"
                                    src="https://dongphucvina.vn/wp-content/uploads/2023/06/logo-thu-do-ha-noi-dongphucvina.vn_.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div style={{ padding: "24px", background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
                    Create Teacher Account
                </Title>

                <Form
                    // {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                    className="w-full"
                >
                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: "Please input your full name!", whitespace: true }]}
                            >
                                <TextInput />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                rules={[{ type: "email", message: "The input is not valid E-mail!" }, { required: true, message: "Please input your E-mail!" }]}
                            >
                                <EmailInput />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>

                        <Col span={12}>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: "Please input your password!" }]}
                            >
                                <PassInput />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="confirm"
                                dependencies={["password"]}
                                rules={[
                                    { required: true, message: "Please confirm your password!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue("password") === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("The passwords do not match!"));
                                        },
                                    }),
                                ]}
                            >
                                <PassInput />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                rules={[{ required: true, message: "Please input your phone number!" }]}
                            >
                                <PhoneInput />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="gender"
                                rules={[{ required: true, message: "Please select gender!" }]}
                            >
                                <GenderSelect />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="avatar"
                        rules={[{ required: false, message: "Please upload your avatar!" }]}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            <Upload.Dragger
                                name="avatar"
                                listType="picture"
                                maxCount={1}
                                onChange={handleAvatarChange}
                                className="grid w-full"
                                beforeUpload={(file) => {
                                    const isJpgOrPng =
                                        file.type === "image/jpeg" || file.type === "image/png";
                                    if (!isJpgOrPng) {
                                        message.error("You can only upload JPG/PNG file!");
                                    }
                                    const isLt2M = file.size / 1024 / 1024 < 2;
                                    if (!isLt2M) {
                                        message.error("Image must be smaller than 2MB!");
                                    }
                                    return isJpgOrPng && isLt2M;
                                }}

                            >
                                <div>
                                    <UploadOutlined style={{ fontSize: 24 }} />
                                    <p className="text-sm ">Ảnh Đại Diện</p>
                                </div>
                            </Upload.Dragger>

                            {avatarUrl && (
                                <div
                                    style={{
                                        width: 120,
                                        height: 120,
                                        borderRadius: "8px",
                                        overflow: "hidden",
                                        border: "1px solid #d9d9d9",
                                    }}
                                >
                                    <img
                                        src={avatarUrl}
                                        alt="Avatar Preview"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </div>
                            )}
                        </div>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        rules={[{ required: false, message: "Please input description" }]}
                    >
                        <TextArea />
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

export default AdminTeacherCreate;
