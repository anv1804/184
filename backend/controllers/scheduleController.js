const getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find(); // Lấy tất cả thời khóa biểu
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSchedule = async (req, res) => {
  const { grade, classSection, subjects, days } = req.body; // Accept new parameters

  try {
    for (const day of days) {
      const periods = day === 'Saturday' ? 4 : 5; // 4 periods for Saturday, 5 for other days

      for (let period = 1; period <= periods; period++) {
        const startTime = calculateStartTime(period, day);
        const endTime = calculateEndTime(startTime);
        const subject = subjects[Math.floor(Math.random() * subjects.length)]; // Randomly select a subject

        const schedule = new Schedule({
          class: `${grade} ${classSection}`, // Combine grade and class section
          subject,
          day,
          period,
          startTime,
          endTime
        });

        await schedule.save();
      }
    }
    res.status(201).json({ message: 'Timetable created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSchedule,
  getSchedules // Xuất hàm mới
}; 