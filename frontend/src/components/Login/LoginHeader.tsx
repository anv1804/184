import React from 'react';
import { Link } from 'react-router-dom';

const LoginHeader = () => {
    return (
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
            <div className="absolute inset-0">
                <img
                    className="object-cover w-full h-full"
                    src="https://xdcs.cdnchinhphu.vn/446259493575335936/2024/3/22/thitotnghiep-16790547178791181639352-17110993987541931839719.jpg"
                    alt=""
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            <div className="relative">
                <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
                    <h3 className="text-4xl font-bold text-white">
                        Hệ thống quản lý &amp; <br className="hidden xl:block" />
                        giáo dục
                        <br />
                    </h3>
                    <ul className="grid grid-cols-1 mt-6 sm:grid-cols-2 gap-x-8 gap-y-4">
                        <li className="flex items-center space-x-3">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                <svg
                                    className="w-3.5 h-3.5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="text-lg font-medium text-white">
                                Nhanh gọn thông minh
                            </span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                <svg
                                    className="w-3.5 h-3.5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="text-lg font-medium text-white">
                                Bảo mật & Riêng tư
                            </span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                <svg
                                    className="w-3.5 h-3.5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="text-lg font-medium text-white">
                                Ứng dụng công nghệ số
                            </span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                <svg
                                    className="w-3.5 h-3.5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <span className="text-lg font-medium text-white">
                                Tích hợp AI hỗ trợ
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LoginHeader;
