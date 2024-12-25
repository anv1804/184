import React, { useState, useEffect } from "react";
import { Layout, Menu, Avatar, Button, Input, Upload } from "antd";
import "tailwindcss/tailwind.css";
import IconCalendar from "../icons/IconCalendar";
import IconCompany from "../icons/IconCompany";
import IconFolder from "../icons/IconFolder";
import IconWallet from "../icons/IconWallet";
import { Link } from "react-router-dom";
import IconLogoutFlash from "../icons/IconLogoutFlash";
import IconUploadFlat from "../icons/IconUploadFlat";
import IconMenuFlat from "../icons/IconMenuFlat";
import { useSidebar } from "../../helpers/sidebarHelper";
import IconFlash from "../icons/IconFlash";
import IconEducation from "../icons/IconEducation";
import IconChat from "../icons/IconChat";
import { useAuth } from '../../context/AuthContext';

const { Sider } = Layout;

const SideBarLeft = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const { isSidebarVisible, toggleSidebar, closeSidebar } = useSidebar();
  const { user, updateUserStatus } = useAuth();
  const props = {
    name: "file",
    action: "/upload", // URL xử lý upload file
    headers: {
      authorization: "Bearer your-auth-token",
    },
    onChange(info: any) {
      if (info.file.status === "done") {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    const handleOnline = () => {
      updateUserStatus(true);
    };

    const handleOffline = () => {
      updateUserStatus(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [updateUserStatus]);

  return (
    <div className="w-full md:max-w-[250px] max-w-[768px] overflow-auto absolute md:sticky">
      {/* Overlay */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <Sider
        width={250}
        className={`h-screen bg-white border-r-[1px] float-left overflow-x-hidden overflow-y-auto transition-transform duration-300 z-50 top-0 ${isSidebarVisible ? "translate-x-0 " : "-translate-x-full "
          } md:translate-x-0`}
        collapsible
        collapsed={collapsed}
      >
        {/* Collapse Button */}
        <div className="absolute top-4 right-4 z-50">
          <Button
            onClick={toggleCollapsed}
            className="bg-transparent hover:bg-gray-200 border-none shadow-none"
            icon={<IconMenuFlat />}
          />
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center py-4 overflow-x-hidden">
          <h2
            className={`logo1 text-blue-500 text-4xl font-semibold uppercase mb-4 ${collapsed ? "text-2xl" : ""
              }`}
          >
            Tclass.
          </h2>

          {/* User Profile */}
          <div
            className={`flex gap-2 w-[80%] items-center justify-start pb-4 border-b-[1px] ${collapsed ? "justify-center" : ""
              }`}
          >
            <Avatar
              size={collapsed ? 48 : 48}
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />

            {!collapsed && (
              <div>
                <div className="text-black font-bold">Jone Copper</div>
                <div className="text-gray-400 text-[10px]">UI Designer</div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap h-full">
            {/* Menu Items */}
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              className="w-full"
              inlineCollapsed={collapsed}
            >
              <Menu.Item key="1" icon={<IconFlash />}>
                <Link to={`/`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Trang Chủ</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<IconCalendar />}>
                <Link to={`/lich-trinh`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Lịch Trình</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<IconEducation />}>
                <Link to={`/lop-hoc`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Lớp Học</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<IconChat />}>
                <Link to={`/tro-chuyen`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Trò Chuyện</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<IconCompany />}>
                <Link to={`/`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Trang Chủ</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<IconFolder />}>
                <Link to={`/`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Tài Liệu</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="7" icon={<IconWallet />}>
                <Link to={`/vi`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Ví</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="profile">
                <Link to="/profile">Trang Cá Nhân</Link>
              </Menu.Item>
            </Menu>

            <div className="w-full h-full">
              {/* Upload Button */}
              <div className="mt-8 w-full px-6 ">
                <Upload {...props} className="!w-full">
                  <Button
                    icon={<IconUploadFlat />}
                    className={`${!collapsed
                      ? "py-12 "
                      : "py-6 !bg-transparent !border-none hover:!bg-transparent"
                      } !rounded-[20px] w-full bg-blue-700 text-white hover:!bg-blue-800 hover:!text-white font-semibold`}
                  >
                    {!collapsed && "Upload File"}
                  </Button>
                </Upload>
              </div>
              {/* Logout Button */}
              <div className="mt-8 ">
                <Button icon={<IconLogoutFlash />} block className="!border-none" />
              </div>
            </div>
          </div>
        </div>
      </Sider>
    </div>
  );
};

export default SideBarLeft;
