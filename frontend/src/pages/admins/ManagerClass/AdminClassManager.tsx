import React, { useState, useEffect } from "react";
import { Table, Space, notification, message } from "antd";
import { getAllClass } from "../../../services/admin/adminClassService";
import { Link, useNavigate } from "react-router-dom";
import SearchFilters from "./Components/SearchFilters";
import ClassTable from "./Components/ClassTable";


const AdminClassManager: React.FC = () => {
    const [classes, setClasses] = useState<any[]>([]);
    const [filteredClasses, setFilteredClasses] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await getAllClass();
                setClasses(data);
                setFilteredClasses(data);
            } catch (error) {
                console.error("Failed to load classes:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

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
                            Quản lý lớp học <span className="border-b-8 border-yellow-300">2025</span>
                        </h2>
                        <p className="max-w-xl mx-auto mt-6 text-xl text-gray-600 md:mt-6">
                            Tổng số lớp đang họat động trong trường : {classes?.length} lớp!
                        </p>
                        <Link
                            to={`/admin/lop-hoc/them-moi`}
                            title=""
                            className="inline-flex items-center justify-center px-4 py-4 mt-2 font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:mt-6 hover:bg-blue-700 focus:bg-blue-700"
                            role="button"
                        >Thêm Lớp Học
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={25}
                                height={24}
                                viewBox="0 0 25 24"
                                fill="none"
                            >
                                <path
                                    d="M22.5 9L12.5 5L2.5 9L12.5 13L22.5 9V15"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M22.5 9L12.5 5L2.5 9L12.5 13L22.5 9V15"
                                    stroke="white"
                                    strokeOpacity="0.2"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6.5 10.6V16C6.5 17.6568 9.18629 19 12.5 19C15.8137 19 18.5 17.6568 18.5 16V10.6"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6.5 10.6V16C6.5 17.6568 9.18629 19 12.5 19C15.8137 19 18.5 17.6568 18.5 16V10.6"
                                    stroke="white"
                                    strokeOpacity="0.2"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
            <SearchFilters
                classes={classes}
                setFilteredClasses={setFilteredClasses}
            />
            <ClassTable
                filteredClasses={filteredClasses}
                loading={loading}
                navigate={navigate}
            />
        </>
    );
};

export default AdminClassManager;
