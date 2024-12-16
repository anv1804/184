import React, { useEffect, useState } from "react";
import instance from "../../services";
import { Link, useParams } from "react-router-dom";
import { Classroom } from "../../interfaces/Class";
import { Student } from "../../interfaces/Student";
import { Avatar, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import IconGender2 from "../../components/icons/IconGender2";
import IconGender1 from "../../components/icons/IconGender1";
import IconSearch from "../../components/icons/IconSearch";
import IconSetting from "../../components/icons/IconSetting";
import IconChat2 from "../../components/icons/IconChat2";
import IconCup from "../../components/icons/IconCup";
import IconRank from "../../components/icons/IconRank";
import IconWarning2 from "../../components/icons/IconWarning2";
import IconLike from "../../components/icons/IconLike";
import IconBook from "../../components/icons/IconBook";
import IconTask from "../../components/icons/IconTask";

const ClassroomDetail: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: Classroom } = await instance.get(`/api/classes/${id}`);
        setStudents(data.students);
        setFilteredStudents(data.students);
      } catch (error) {
        console.error("Failed to fetch classroom data:", error);
      }
    })();
  }, [id]);

  // Handle manual toggle for individual checkbox
  const handleCheckboxChange = (studentId: string) => {
    setSelectedStudents((prev) => {
      const newSelected = prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId];

      setCheckAll(newSelected.length === filteredStudents.length);
      return newSelected;
    });
  };

  // Handle "Check All" toggle
  const handleCheckAll = () => {
    if (checkAll) {
      setSelectedStudents([]); // Uncheck all
    } else {
      setSelectedStudents(filteredStudents.map((student) => student._id)); // Select all
    }
    setCheckAll(!checkAll);
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(value)
    );
    setFilteredStudents(filtered);
    setCheckAll(false);
    setSelectedStudents([]);
  };

  // Handle sorting
  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredStudents].sort((a, b) => {
      if (key === "name" || key === "gender") {
        return direction === "asc"
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
      return 0;
    });
    setFilteredStudents(sorted);
  };

  const handleSubmit = () => {
    console.log("Selected Students' IDs: ", selectedStudents);
    alert(`Selected Students: \n${selectedStudents.join(", ")}`);
  };

  return (
    <div className="px-6">
      <section className="py-2 bg-white sm:py-4 lg:py-6 border-b-[1px] mb-6 sticky">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-6 px-0 sm:px-0 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
            <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
              <div className="md:px-4 md:py-6 px-2 py-2">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-12 h-12 text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <div className="ml-4">
                    <h4 className="text-4xl font-bold text-gray-900">6+</h4>
                    <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                      Thứ Hạng
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
              <div className="md:px-4 md:py-6 px-2 py-2">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-12 h-12 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <div className="ml-4">
                    <h4 className="text-4xl font-bold text-gray-900">{students.length}</h4>
                    <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                      Thành Viên
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
              <div className="md:px-4 md:py-6 px-2 py-2">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-12 h-12 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="ml-4">
                    <h4 className="text-4xl font-bold text-gray-900">3,274</h4>
                    <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                      Công việc
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
              <div className="md:px-4 md:py-6 px-2 py-2">
                <div className="flex items-start">
                  <svg
                    className="flex-shrink-0 w-12 h-12 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  <div className="ml-4">
                    <h4 className="text-4xl font-bold text-gray-900">98%</h4>
                    <p className="mt-1.5 text-lg font-medium leading-tight text-gray-500">
                      Thành Tích
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Search */}
      <div className="my-4 flex items-center justify-end">
        <Input
          className="w-full max-w-md p-2"
          placeholder="Tìm kiếm theo tên..."
          prefix={<IconSearch />}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {/* Table */}
      <table className="table border w-full overflow-x-auto h-[50%]">
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={checkAll}
                  onChange={handleCheckAll}
                />
              </label>
            </th>
            <th
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Tên {sortConfig?.key === "name" && (sortConfig.direction === "asc" ? "▲" : "▼")}
            </th>
            <th>Student ID</th>
            <th
              className="cursor-pointer"
              onClick={() => handleSort("gender")}
            >
              Giới Tính {sortConfig?.key === "gender" && (sortConfig.direction === "asc" ? "▲" : "▼")}
            </th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={selectedStudents.includes(student._id)}
                      onChange={() => handleCheckboxChange(student._id)}
                    />
                  </label>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={student.avatar}
                          alt={`${student.name}'s avatar`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{student.name}</div>
                      <div className="text-sm opacity-50">Student ID: {student._id}</div>
                    </div>
                  </div>
                </td>
                <td>{student._id}</td>
                <td><div className="px-3">{student.gender === "Male" ? <IconGender1 /> : <IconGender2 />}</div></td>
                <td className="">
                  <div className="dropdown dropdown-hover dropdown-left px-3">
                    <div tabIndex={0} role="button" className="border hover:text-gray-900 hover:border-gray-300 hover:shadow-lg p-1 text-gray-400 rounded-full shadow-sm"><IconSetting /></div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 border shadow duration-200">
                      <li className="capitalize font-bold mb-3 pb-2 border-b-[1px]">
                        <Link to={`/trang-ca-nhan/${student._id}`}>
                          <div className="avatar py-1">
                            <div className="ring-primary ring-offset-base-100 rounded-full ring ring-offset-2">
                              <Avatar className="border" src={student.avatar} alt={`${student.name}'s avatar`} />
                            </div>
                          </div>
                          Trang cá nhân
                        </Link>
                      </li>
                      <li className="capitalize hover:font-bold hover:text-blue-600"><Link to={`/tro-chuyen/${student._id}`}> <IconChat2 />Trò Chuyện</Link></li>
                      <li className="capitalize hover:font-bold hover:text-blue-600"><Link to={`/bang-diem/${student._id}`}> <IconBook />Bảng điểm</Link></li>
                      <li className="capitalize hover:font-bold hover:text-blue-600"><Link to={`/nhiem-vu/${student._id}`}> <IconTask />nhiệm vụ</Link></li>
                      <li className="capitalize hover:font-bold hover:text-blue-600"><Link to={`/khen-thuong/${student._id}`}> <IconLike />khen thưởng</Link></li>
                      <li className="capitalize hover:font-bold hover:text-blue-600"><Link to={`/xep-hang/${student._id}`}> <IconRank />Xếp Hạng</Link></li>
                      <li className="capitalize hover:font-bold hover:text-blue-600"><Link to={`/thanh-tich/${student._id}`}> <IconCup />Thành Tích</Link></li>
                      <li className="capitalize hover:font-bold  text-red-600"><Link to={`/`}> <IconWarning2 />Báo Cáo</Link></li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
                Không tìm thấy học sinh nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Submit Button */}
      <div className="mt-4 text-right">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Xác Nhận
        </button>
      </div>
    </div>
  );
};

export default ClassroomDetail;
