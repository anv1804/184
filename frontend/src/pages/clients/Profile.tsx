import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../../services';
import { Student } from '../../interfaces/Student';
import { Image } from 'antd';
import Social from '../../components/Profile/Social';

const Profile = () => {
    const [dataUser, setDataUser] = useState<Student | null>(null);
const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            try {
                const { data }: { data: Student } = await instance.get('/api/users/675264068d5344fd0354b6ae');
                setDataUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        })();
    }, []);

    return (
        <>
            <section className="relative pt-36 pb-24">
                <img
                    src="https://pagedone.io/asset/uploads/1705471739.png"
                    alt="cover-image"
                    className="w-full absolute top-0 left-0 z-0 h-60 object-cover"
                />
                <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
                    <div className="flex items-center justify-center relative z-10 mb-2.5">
                        <img
                            src={dataUser?.avatar || 'https://via.placeholder.com/150'}
                            alt="user-avatar-image"
                            className="border-4 w-48 h-48 border-solid border-white rounded-full object-cover cursor-pointer"
                            onClick={() => navigate(`/anh/${dataUser?._id || 'placeholder'}`)}
                        />

                    </div>
                    <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
                        <ul className="flex items-center gap-5">
                            <li>
                                <Link
                                    to="/"
                                    className="flex items-center gap-2 cursor-pointer group"
                                >
                                    <svg
                                        width={20}
                                        height={20}
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12.5 14.0902L7.5 14.0902M2.5 9.09545V14.0902C2.5 15.6976 2.5 16.5013 2.98816 17.0006C3.47631 17.5 4.26198 17.5 5.83333 17.5H14.1667C15.738 17.5 16.5237 17.5 17.0118 17.0006C17.5 16.5013 17.5 15.6976 17.5 14.0902V10.9203C17.5 9.1337 17.5 8.24039 17.1056 7.48651C16.7112 6.73262 15.9846 6.2371 14.5313 5.24606L11.849 3.41681C10.9528 2.8056 10.5046 2.5 10 2.5C9.49537 2.5 9.04725 2.80561 8.151 3.41681L3.98433 6.25832C3.25772 6.75384 2.89442 7.0016 2.69721 7.37854C2.5 7.75548 2.5 8.20214 2.5 9.09545Z"
                                            stroke="black"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span className="font-medium text-base leading-7 text-gray-900">
                                        Home
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="javascript:;"
                                    className="flex items-center gap-2 cursor-pointer group"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={5}
                                        height={20}
                                        viewBox="0 0 5 20"
                                        fill="none"
                                    >
                                        <path
                                            d="M4.12567 1.13672L1 18.8633"
                                            stroke="#E5E7EB"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span className="font-medium text-base leading-7 text-gray-400">
                                        Account
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="javascript:;"
                                    className="flex items-center gap-2 cursor-pointer group"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={5}
                                        height={20}
                                        viewBox="0 0 5 20"
                                        fill="none"
                                    >
                                        <path
                                            d="M4.12567 1.13672L1 18.8633"
                                            stroke="#E5E7EB"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span className="font-medium text-base leading-7 text-gray-400">
                                        Profile
                                    </span>
                                    <span className="rounded-full py-1.5 px-2.5 bg-indigo-50 flex items-center justify-center font-medium text-xs text-indigo-600">
                                        New
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <div className="flex items-center gap-4">
                            <button className="rounded-full border border-solid border-gray-300 bg-gray-50 py-3 px-4 text-sm font-semibold text-gray-900 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-50 hover:bg-gray-100 hover:border-gray-300">
                                Message
                            </button>
                            <button className="rounded-full border border-solid border-indigo-600 bg-indigo-600 py-3 px-4 text-sm font-semibold text-white whitespace-nowrap shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-indigo-700 hover:border-indigo-700">
                                Book a Session
                            </button>
                        </div>
                    </div>
                    <h3 className="text-center font-manrope font-bold text-3xl leading-10 text-gray-900 mb-3">
                        {dataUser?.name || 'Jenny Wilson'}
                    </h3>
                    <p className="font-normal text-base leading-7 text-gray-500 text-center mb-8">
                        {dataUser?.description || 'A social media influencer and singer'}
                    </p>
                    <Social />
                </div>
            </section>
        </>
    );
};

export default Profile;
