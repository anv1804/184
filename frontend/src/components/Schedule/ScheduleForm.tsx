import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Checkbox, Table, Input } from 'antd';

const subjectsList = [
  'Ngữ Văn', 'Toán', 'Ngoại ngữ 1', 'Lịch sử', 'Địa lí', 
  'Vật lí', 'Hóa học', 'Sinh học', 'Giáo dục công dân', 
  'Giáo dục quốc phòng và an ninh', 'Công nghệ', 'Tin học', 
  'Giáo dục thể chất'
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ScheduleForm = () => {
  const [selectedGrades, setSelectedGrades] = useState<string[]>(['10']); // Default to grade 10
  const [classSections, setClassSections] = useState<string[]>([]); // Allow multiple selections
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']); // Default checked days
  const [periods, setPeriods] = useState<{ [key: string]: number }>({}); // Store periods for each subject
  const [timetables, setTimetables] = useState<any[]>([]); // Store generated timetables
  const [dayPeriods, setDayPeriods] = useState<{ [key: string]: number }>({}); // Store periods for each day

  // Initialize dayPeriods with default values
  daysOfWeek.forEach(day => {
    if (day === 'Sunday') {
      dayPeriods[day] = 0; // Default to 0 for Sunday
    } else if (day === 'Saturday') {
      dayPeriods[day] = 4; // Default to 4 for Saturday
    } else {
      dayPeriods[day] = 5; // Default to 5 for other days
    }
  });

  const handleGradeChange = (checkedValues: any) => {
    setSelectedGrades(checkedValues);
  };

  const handleDayChange = (checkedValues: any) => {
    setSelectedDays(checkedValues);
  };

  const handleSubjectChange = (value: string[]) => {
    setSelectedSubjects(value);
  };

  const handleClassSectionChange = (checkedValues: any) => {
    setClassSections(checkedValues);
  };

  const handleSelectAllClassSections = () => {
    if (classSections.length === 14) {
      setClassSections([]); // Deselect all if already selected
    } else {
      setClassSections(Array.from({ length: 14 }, (_, i) => `A${i + 1}`)); // Select all A1 to A14
    }
  };

  const handleSelectAllDays = () => {
    if (selectedDays.length === daysOfWeek.length) {
      setSelectedDays([]); // Deselect all if already selected
    } else {
      setSelectedDays(daysOfWeek); // Select all
    }
  };

  const handleSelectAllSubjects = () => {
    if (selectedSubjects.length === subjectsList.length) {
      setSelectedSubjects([]); // Deselect all if already selected
      setPeriods({}); // Reset periods when deselecting all
    } else {
      setSelectedSubjects(subjectsList); // Select all
      // Set default periods for all selected subjects
      const newPeriods = subjectsList.reduce((acc, subject) => {
        acc[subject] = 1; // Default to 1 period for each subject
        return acc;
      }, {} as { [key: string]: number });
      setPeriods(newPeriods);
    }
  };

  const handleSubmit = async (values: any) => {
    // Combine selected grades and class sections into classes
    const classes = selectedGrades.flatMap(grade => 
      classSections.map(section => (section === 'All' ? `${grade}A${1}` : `${grade}${section}`))
    ).filter(cls => cls !== undefined);

    // Generate timetables
    const newTimetables = classes.map(cls => {
      const timetable = {
        class: cls,
        schedule: {} as { [key: string]: { subject: string; periods: number }[] }
      };

      selectedDays.forEach(day => {
        timetable.schedule[day] = [];
        const subjectCount: { [key: string]: number } = {}; // Track the number of periods assigned for each subject

        // Determine the number of periods for the day
        const periodsPerDay = day === 'Saturday' ? 4 : 5; // 4 periods on Saturday, 5 on other days

        for (let i = 0; i < periodsPerDay; i++) { // Use periodsPerDay variable
          let subject: string;
          do {
            subject = selectedSubjects[Math.floor(Math.random() * selectedSubjects.length)];
          } while ((subjectCount[subject] || 0) >= (periods[subject] || 0)); // Ensure we don't exceed the period limit

          // Increment the count for the assigned subject
          subjectCount[subject] = (subjectCount[subject] || 0) + 1;

          const periodCount = periods[subject] || 0; // Get the number of periods for the subject
          timetable.schedule[day].push({ subject, periods: periodCount });
        }
      });

      return timetable;
    });

    setTimetables(newTimetables); // Update the state with the generated timetables

    // Log the data to the console
    console.log({
      classes, // Log the combined classes
      subjects: selectedSubjects.map(subject => ({
        name: subject,
        periods: periods[subject] || 0 // Get the number of periods for each subject
      })),
      days: selectedDays.map(day => ({
        name: day,
        periods: dayPeriods[day] || (day === 'Saturday' ? 4 : 5) // Default periods for each day
      })),
      timetables: newTimetables // Log the generated timetables
    });

    // Temporarily skip the API call
    // try {
    //   const response = await axios.post('/api/schedules/create', { 
    //     classes, 
    //     subjects: selectedSubjects,
    //     periods,
    //     days: selectedDays
    //   });
    //   alert(response.data.message);
    // } catch (error) {
    //   console.error(error);
    //   alert('Error creating schedule');
    // }
  };

  const columns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      render: (text: string) => (
        <Checkbox 
          value={text} 
          checked={selectedSubjects.includes(text)} // Check if the subject is selected
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedSubjects([...selectedSubjects, text]);
            } else {
              setSelectedSubjects(selectedSubjects.filter(subject => subject !== text));
            }
          }}
        >
          {text}
        </Checkbox>
      )
    },
    {
      title: 'Periods per Week',
      dataIndex: 'periods',
      render: (text: string, record: any) => (
        <Input 
          type="number" 
          min={0} 
          value={periods[record.subject] || 0} 
          onChange={(e) => setPeriods({ ...periods, [record.subject]: Number(e.target.value) })} 
        />
      )
    }
  ];

  const data = subjectsList.map(subject => ({ key: subject, subject }));

  // Table for Days of the Week
  const dayColumns = [
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
      render: (text: string) => (
        <Checkbox 
          value={text} 
          checked={selectedDays.includes(text)} // Check if the day is selected
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedDays([...selectedDays, text]);
            } else {
              setSelectedDays(selectedDays.filter(day => day !== text));
            }
          }}
        >
          {text}
        </Checkbox>
      )
    },
    {
      title: 'Periods',
      dataIndex: 'periods',
      key: 'periods',
      render: (text: string, record: any) => (
        <Input 
          type="number" 
          min={0} 
          value={dayPeriods[record.day] || (record.day === 'Saturday' ? 4 : 5)} // Default periods
          onChange={(e) => {
            const newValue = Number(e.target.value);
            setDayPeriods({ ...dayPeriods, [record.day]: newValue });
            // Check the checkbox if the value is greater than 0
            if (newValue > 0 && !selectedDays.includes(record.day)) {
              setSelectedDays([...selectedDays, record.day]);
            } else if (newValue === 0 && selectedDays.includes(record.day)) {
              setSelectedDays(selectedDays.filter(day => day !== record.day));
            }
          }} 
        />
      )
    }
  ];

  const dayData = daysOfWeek.map(day => ({ key: day, day }));

  return (
    <Form onFinish={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Create Timetable</h2>
      
      <Form.Item label="Grades">
        <Checkbox.Group onChange={handleGradeChange} value={selectedGrades} className="ml-2">
          <Checkbox value="10">10</Checkbox>
          <Checkbox value="11">11</Checkbox>
          <Checkbox value="12">12</Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="Class Sections">
        <Button onClick={handleSelectAllClassSections} className="mb-2">
          {classSections.length === 14 ? 'Deselect All' : 'Select All'}
        </Button>
        <Checkbox.Group onChange={handleClassSectionChange} value={classSections} className="ml-2">
          {Array.from({ length: 14 }, (_, i) => (
            <Checkbox key={i} value={`A${i + 1}`}>A{i + 1}</Checkbox>
          ))}
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="Subjects">
        <Button onClick={handleSelectAllSubjects} className="mb-2">
          {selectedSubjects.length === subjectsList.length ? 'Deselect All' : 'Select All'}
        </Button>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey="subject"
        />
      </Form.Item>

      <Form.Item label="Periods for Each Day">
        <Table
          columns={dayColumns}
          dataSource={dayData}
          pagination={false}
          rowKey="day"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="mt-4">Create Schedule</Button>
      </Form.Item>

      {/* Render Timetables */}
      {timetables.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mt-4">Generated Timetables</h3>
          {timetables.map((timetable, index) => (
            <div key={index}>
              <h4>{timetable.class}</h4>
              <Table
                dataSource={Object.entries(timetable.schedule).map(([day, subjects]) => ({
                  day,
                  subjects
                }))}
                columns={[
                  {
                    title: 'Day',
                    dataIndex: 'day',
                    key: 'day',
                  },
                  {
                    title: 'Subjects',
                    dataIndex: 'subjects',
                    key: 'subjects',
                    render: (subjects: any) => (
                      <ul>
                        {subjects.map((sub: any, idx: number) => (
                          <li key={idx}>{sub.subject} - {sub.periods} periods</li>
                        ))}
                      </ul>
                    )
                  }
                ]}
                pagination={false}
                rowKey="day"
              />
            </div>
          ))}
        </div>
      )}
    </Form>
  );
};

export default ScheduleForm; 