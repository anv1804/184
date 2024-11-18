import React from 'react'
import Schedule from '../../components/Schedule';
const Dashboard = () => {
    return (
        <div className='w-full main-content'>
            <div className="w-full bg-white overflow-auto" >
                <div className="calendar">
                    <Schedule />
                </div>
            </div>
        </div>
    )
}

export default Dashboard