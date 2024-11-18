import {
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import { DateSelectArg, EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { tokens } from "../themes";
import { useState } from "react";
import { Modal, Form, Input, Select, DatePicker, Button, Avatar } from "antd";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;

interface TaskType {
  label: string;
  value: string;
  color: string;
}

interface Employee {
  name: string;
  value: string;
  image: string;
}
interface CustomEvent {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  allDay?: boolean;
  backgroundColor?: string;
  description?: string;
  assignedEmployee?: string[]; // Đa chọn
}

const taskTypes: TaskType[] = [
  { label: "Quan Trọng", value: "type1", color: "#0177FB" },
  { label: "Tương Lai", value: "type2", color: "#FE6470" },
  { label: "Họp", value: "type3", color: "#01D7DF" },
  { label: "Task Type 4", value: "type4", color: "#FF33A8" },
];

const employees: Employee[] = [
  { name: "Alice Johnson", value: "alice", image: "https://via.placeholder.com/24" },
  { name: "Bob Smith", value: "bob", image: "https://via.placeholder.com/24" },
  { name: "Charlie Lee", value: "charlie", image: "https://via.placeholder.com/24" },
];

const Calendar: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isSmDevices = useMediaQuery("(max-width:600px)");
  const isXsDevices = useMediaQuery("(max-width:380px)");
  const [currentEvents, setCurrentEvents] = useState<CustomEvent[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [form] = Form.useForm();
  const [currentView, setCurrentView] = useState(() => {
    // Lấy chế độ xem từ localStorage hoặc mặc định là "dayGridMonth"
    return localStorage.getItem("calendarView") || "dayGridMonth";
  });

  const handleViewChange = (view: string) => {
    setCurrentView(view); // Cập nhật state chế độ xem
    localStorage.setItem("calendarView", view); // Lưu chế độ xem vào localStorage
  };
  const handleAddEventClick = () => {
    setSelectedDate(null);
    setIsModalVisible(true);
  };

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        const calendarApi = selectedDate?.view.calendar;
        calendarApi?.unselect();

        const taskType = taskTypes.find((type) => type.value === values.type);

        if (values.title && taskType) {
          calendarApi?.addEvent({
            id: `${selectedDate ? selectedDate.startStr : moment().format()}-${values.title}`,
            title: values.title,
            start: values.startDate.format(),
            end: values.endDate.format(),
            allDay: selectedDate?.allDay ?? false,
            backgroundColor: taskType.color,
            extendedProps: {
              description: values.description,
              assignedEmployee: values.employee,
            },
          });
        }
        form.resetFields();
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <Box className="p-6 w-full">
      <Box display="flex" justifyContent="space-between" gap={2}>
        <Box flex="1 1 100%">
          <Button type="primary" onClick={handleAddEventClick} style={{ marginBottom: 16 }}>
            Add Event
          </Button>
          <FullCalendar
            height="70vh"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: `${isSmDevices ? "prev,next" : "prev,next today"}`,
              center: "title",
              right: `${isXsDevices
                ? ""
                : isSmDevices
                  ? "dayGridMonth,listMonth"
                  : "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                }`,
            }}
            initialView={currentView}
            datesSet={(dateInfo) => {
              handleViewChange(dateInfo.view.type); // Lắng nghe sự thay đổi chế độ xem
            }}
            // initialView="dayGridMonth"
            editable
            selectable
            selectMirror
            dayMaxEvents
            select={handleDateClick}
            eventsSet={(events) =>
              setCurrentEvents(
                events.map((event) => ({
                  id: event.id,
                  title: event.title,
                  start: event.start as Date,
                  end: event.end as Date,
                  allDay: event.allDay,
                  backgroundColor: event.backgroundColor,
                  description: event.extendedProps.description,
                  assignedEmployee: event.extendedProps.assignedEmployee,
                }))
              )
            }
            initialEvents={[{ id: "12315", title: "All-day event", date: "2024-02-27" }]}
            eventContent={(eventInfo) => {
              const { extendedProps } = eventInfo.event;
              const assignedEmployees: string[] = extendedProps?.assignedEmployee || []; // Gán kiểu rõ ràng

              return (
                <div className="w-full px-1 flex justify-between">
                  <div className="thumbnail flex gap-3">
                    <img
                      className="w-[50px] h-[50px] rounded-[10px]"
                      src="https://burst.shopifycdn.com/photos/fog-on-dark-waters-edge.jpg?width=1000&format=pjpg&exif=0&iptc=0"
                      alt=""
                    />
                    <div className="fc-content ">
                      <div className="fc-content-main w-[60%]">
                        <h4 className="w-full block text-ellipsis text-left text-lg capitalize font-bold">
                          {eventInfo.event.title}
                        </h4>
                        <p>{extendedProps?.description}</p>
                      </div>
                    </div>
                  </div>

                  {assignedEmployees.length > 0 && (
                    <div className="assigned-employee flex items-center">
                      <Avatar.Group maxCount={1} maxPopoverPlacement="bottom" size="small" className="ml-2">
                        {assignedEmployees.map((employeeValue: string) => {
                          const employee = employees.find((emp) => emp.value === employeeValue);
                          return (
                            employee && <Avatar key={employee.value} src={employee.image} alt={employee.name} />
                          );
                        })}
                      </Avatar.Group>
                    </div>
                  )}
                </div>
              );
            }}

          />
        </Box>

        {/* Event Modal */}
        <Modal
          title={<h2 className="text-xl font-bold">Tạo lịch trình</h2>}
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText="Create"
          cancelText="Cancel"
        >
          <Form
            form={form}
            className="border-t-[1px] pt-4"
            layout="vertical"
            name="eventForm"
            initialValues={{
              startDate: selectedDate ? moment(selectedDate.start) : null,
              endDate: selectedDate ? moment(selectedDate.end) : null,
            }}
          >
            <div className="grid grid-cols-2 gap-6">
              <Form.Item
                name="title"
                className="w-full"
                label="Event Title"
                rules={[{ required: true, message: "Please enter the event title" }]}
              >
                <Input placeholder="Enter event title" className="rounded-md h-10" />
              </Form.Item>
              <Form.Item
                name="type"
                label="Task Type"
                className=""
                rules={[{ required: true, message: "Please select a task type" }]}
              >
                <Select placeholder="Select task type" className="h-10">
                  {taskTypes.map((type) => (
                    <Option key={type.value} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <Form.Item name="description" label="Description">
              <TextArea placeholder="Enter event description" rows={3} />
            </Form.Item>
            <Form.Item name="employee" label="Assign to Employee">
              <Select
                placeholder="Select employee(s)"
                allowClear
                mode="multiple" // Cho phép đa chọn
              >
                {employees.map((employee) => (
                  <Option key={employee.value} value={employee.value}>
                    <img
                      src={employee.image}
                      alt={employee.name}
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        marginRight: 8,
                        verticalAlign: "middle",
                      }}
                    />
                    {employee.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <div className="flex gap-6 justify-between">
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[{ required: true, message: "Please select a start date" }]}
              >
                <DatePicker showTime placeholder="Select start date" />
              </Form.Item>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[{ required: true, message: "Please select an end date" }]}
              >
                <DatePicker showTime placeholder="Select end date" />
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </Box>
    </Box>
  );
};

export default Calendar;
