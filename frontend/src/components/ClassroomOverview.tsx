import React from 'react';
import { Card, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useClassroomContext } from '../context/ClassroomContext';

const ClassroomOverview: React.FC = () => {
    const { classData, loading } = useClassroomContext();
    const navigate = useNavigate();

    return (
        <Card
            title="Tổng quan dữ liệu lớp học"
            bordered={false}
            style={{ width: '100%', marginBottom: '16px' }}
        >
            {loading ? (
                <p>Đang tải thông tin lớp học...</p>
            ) : classData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {classData.map((classItem) => (
                        <Link to={`/lop-hoc/${classItem.id}`} className="card bg-base-100 w-full shadow-lg group hover:shadow-xl border-[1px] hover:border-blue-400">
                            <figure className='relative overflow-hidden group-[avn]'>
                                <img className='group-hover:scale-110 duration-200'
                                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                    alt="Shoes" />
                                <button className='absolute hidden group-[avn]-hover:block'>xem</button>
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title flex flex-wrap">
                                    <span> Lớp : {classItem.className}</span>
                                    <div className="badge badge-warning flex gap-1">
                                        <span>Sĩ Số</span>:<span>{classItem.studentCount}</span>
                                    </div>
                                </h2>
                                <p>{classItem.description}</p>
                                <div className="card-actions justify-end">
                                    <button className="badge flex gap-1 text-[16px] font-semibold p-3 bg-blue-700 hover:bg-blue-400 text-white">
                                        <span>GVCN</span>:<span className=''>{classItem.homeroomTeacher}</span>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>Không có dữ liệu lớp học để hiển thị.</p>
            )}
        </Card>
    );
};

export default ClassroomOverview;
