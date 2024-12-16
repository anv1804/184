import React, { useState } from "react";
import { Button, Input, Upload, message, Steps, Form, Select, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const StudentForm = () => {
    const [step, setStep] = useState(0);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const [customAvatar, setCustomAvatar] = useState<File | null>(null);

    const handleGenerateAvatar = (inputName: string) => {
        const seed = encodeURIComponent(inputName);
        return `https://api.dicebear.com/6.x/adventurer/svg?seed=${seed}`;
    };

    const handleRandomAvatar = () => {
        const randomSeed = Math.random().toString(36).substring(7);
        setAvatar(`https://api.dicebear.com/6.x/adventurer/svg?seed=${randomSeed}`);
    };

    const handleUpload = (info: any) => {
        if (info.file) {
            setCustomAvatar(info.file.originFileObj);
            message.success("Avatar uploaded successfully.");
        }
    };

    const handleNextStep = () => {
        if (step === 0 && name.trim() === "") {
            message.error("Please input your name to proceed.");
            return;
        }

        if (step === 1) {
            setAvatar(handleGenerateAvatar(name));
        }

        setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    const steps = [
        { title: "Enter Name" },
        { title: "Select Avatar" },
        { title: "Personal Info" },
    ];

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="w-[500px] bg-white p-6 shadow-lg rounded-lg">
                {/* Thanh Linear Step */}
                <Steps
                    current={step}
                    items={steps}
                />

                {step === 0 && (
                    <>
                        <h2 className="text-xl text-center mb-4">Enter Your Name</h2>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="mb-4"
                        />
                        <Button
                            type="primary"
                            onClick={handleNextStep}
                            className="w-full"
                        >
                            Next
                        </Button>
                    </>
                )}

                {step === 1 && (
                    <>
                        <h2 className="text-xl text-center mb-4">Select Avatar</h2>
                        <div className="text-center mb-4">
                            {customAvatar ? (
                                <img
                                    src={URL.createObjectURL(customAvatar)}
                                    alt="Custom Avatar"
                                    className="h-32 w-32 mx-auto rounded-full border"
                                />
                            ) : (
                                <img
                                    src={avatar}
                                    alt="Generated Avatar"
                                    className="h-32 w-32 mx-auto rounded-full border"
                                />
                            )}
                        </div>
                        <div className="flex justify-around mb-4">
                            <Button
                                onClick={handleRandomAvatar}
                                type="default"
                                className="w-1/2"
                            >
                                Random Avatar
                            </Button>
                            <Upload
                                beforeUpload={() => false}
                                onChange={handleUpload}
                                showUploadList={false}
                                className="w-1/2"
                            >
                                <Button
                                    icon={<UploadOutlined />}
                                    className="w-full"
                                >
                                    Upload
                                </Button>
                            </Upload>
                        </div>
                        <div className="flex justify-between">
                            <Button
                                onClick={handleBack}
                                type="default"
                                className="w-1/2"
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleNextStep}
                                type="primary"
                                className="w-1/2"
                            >
                                Next
                            </Button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="text-xl text-center mb-4">Personal Information</h2>
                        <Form layout="vertical" className="mb-4">
                            <Form.Item label="Full Name">
                                <Input defaultValue={name} readOnly />
                            </Form.Item>
                            <Form.Item label="Email">
                                <Input placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item label="Date of Birth">
                                <DatePicker className="w-full" />
                            </Form.Item>
                            <Form.Item label="Gender">
                                <Select placeholder="Select your gender">
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>
                            <div className="flex justify-between">
                                <Button
                                    onClick={handleBack}
                                    className="w-1/2"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="primary"
                                    className="w-1/2"
                                    htmlType="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </>
                )}
            </div>
        </div>
    );
};

export default StudentForm;
