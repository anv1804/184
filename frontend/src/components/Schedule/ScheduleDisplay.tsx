import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Định nghĩa kiểu Schedule
interface Schedule {
  _id: string;
  class: string;
  subject: string;
  day: string;
  period: number;
  startTime: string;
  endTime: string;
}

const ScheduleDisplay = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('/api/schedules'); // Endpoint để lấy thời khóa biểu
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Thời Khóa Biểu</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Lớp</th>
            <th className="border px-4 py-2">Môn Học</th>
            <th className="border px-4 py-2">Ngày</th>
            <th className="border px-4 py-2">Tiết</th>
            <th className="border px-4 py-2">Thời Gian</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule._id}>
              <td className="border px-4 py-2">{schedule.class}</td>
              <td className="border px-4 py-2">{schedule.subject}</td>
              <td className="border px-4 py-2">{schedule.day}</td>
              <td className="border px-4 py-2">{schedule.period}</td>
              <td className="border px-4 py-2">{schedule.startTime} - {schedule.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleDisplay; 