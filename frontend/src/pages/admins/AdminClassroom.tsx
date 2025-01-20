import React from 'react'
import ClassForm from '../../components/Class/ClassForm'
import ScheduleForm from '../../components/Schedule/ScheduleForm'
import ScheduleDisplay from '../../components/Schedule/ScheduleDisplay'

const AdminClassroom = () => {
    return (
        <div className="bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">Quản Lý Thời Khóa Biểu</h1>
            <ClassForm />
            <ScheduleForm />
            <ScheduleDisplay />
        </div>
    )
}

export default AdminClassroom