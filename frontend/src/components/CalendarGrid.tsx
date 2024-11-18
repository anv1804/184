import React from "react";

const CalendarGrid: React.FC = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  // Lấy số ngày của tháng hiện tại
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  // Lấy ngày bắt đầu của tháng hiện tại (0 = Chủ Nhật, 6 = Thứ Bảy)
  const startDay = new Date(currentYear, currentMonth, 1).getDay();
  // Lấy số ngày của tháng trước
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  // Tạo danh sách ngày đầy đủ
  const days = [
    // Ngày của tháng trước
    ...Array.from(
      { length: startDay },
      (_, i) => prevMonthDays - startDay + i + 1
    ),
    // Ngày của tháng hiện tại
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Thêm các ngày của tháng sau để lấp đầy hàng cuối
  while (days.length % 7 !== 0) {
    days.push(days.length - daysInMonth - startDay + 1);
  }

  return (
    <div className="grid grid-cols-7 text-center text-sm mb-4">
      {days.map((day, index) => (
        <span
          key={index}
          className={`p-1 ${
            index >= startDay && index < startDay + daysInMonth
              ? "text-gray-700 cursor-pointer hover:text-blue-500 hover:bg-blue-100 rounded-full" // Ngày trong tháng hiện tại
              : "text-gray-400 cursor-pointer hover:text-white hover:bg-blue-200 rounded-full" // Ngày ngoài tháng
          } ${
            day === today.getDate() &&
            index >= startDay &&
            index < startDay + daysInMonth
              ? "bg-blue-400 rounded-full text-gray-200 hover:text-white"
              : ""
          }`}
        >
          {day}
        </span>
      ))}
    </div>
  );
};

export default CalendarGrid;