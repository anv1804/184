import React, { useState } from 'react';
import { Layout, Menu, Avatar, Button, Input } from 'antd';
import 'tailwindcss/tailwind.css';
import IconCalendar from '../icons/IconCalendar';
import IconBagFlat from '../icons/IconEducation';
import IconChatFlat from '../icons/IconChatFlat';
import IconCompany from '../icons/IconCompany';
import IconFolder from '../icons/IconFolder';
import IconWallet from '../icons/IconWallet';
import { Link } from 'react-router-dom';
import IconLogoutFlash from '../icons/IconLogoutFlash';
import IconUploadFlat from '../icons/IconUploadFlat';
import IconMenuFlat from '../icons/IconMenuFlat';
import { useSidebar } from '../../helpers/sidebarHelper';
import IconSearch from '../icons/IconSearch';
import IconFlash from '../icons/IconFlash';
import IconEducation from '../icons/IconEducation';
import IconChat from '../icons/IconChat';

const { Sider } = Layout;

const SideBarLeft = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const { isSidebarVisible, toggleSidebar, closeSidebar } = useSidebar();
  return (
    <div className='w-full md:max-w-[250px] max-w-[768px] overflow-auto absolute md:sticky'>
      <div className="flex w-full items-center overflow-auto justify-between p-4 border-b-[1px] md:hidden absolute md:sticky ">
        <div className="flex items-center w-full border rounded-lg ">
          <Input
            placeholder="Search"
            prefix={<IconSearch />}
            bordered={false}
            className="w-full px-2 py-2 text-gray-600"
          />
        </div>
        <Button
          className="ml-4 md:hidden block z-50"
          icon={<IconMenuFlat />}
          onClick={toggleSidebar}
        />
      </div>
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
        className={`h-screen bg-white border-r-[1px] float-left overflow-x-hidden overflow-y-auto transition-transform duration-300 z-50 top-0  ${isSidebarVisible ? 'translate-x-0 ' : '-translate-x-full '
          } md:translate-x-0 `}
        collapsed={collapsed}
        collapsible
        onCollapse={toggleCollapsed}
      >
        <div className="w-full overflow-x-hidden">
          <div className="flex flex-col items-center py-4 overflow-x-hidden">
            {/* Logo */}
            <h2 className={`logo1 text-blue-500 text-4xl font-semibold uppercase mb-4 ${collapsed ? 'text-2xl' : ''}`}>
              Tclass.
            </h2>

            {/* User Profile */}
            <div
              className={`flex gap-2 w-[80%] items-center justify-start pb-4 border-b-[1px] ${collapsed ? 'justify-center' : ''
                }`}
            >
              <Avatar size={collapsed ? 48 : 48} src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />

              {!collapsed && (
                <div>
                  <div className="text-black font-bold">Jone Copper</div>
                  <div className="text-gray-400 text-[10px]">UI Designer</div>
                </div>
              )}
            </div>

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
                <Link to={`/`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Lớp Học</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<IconChat />}>
                <Link to={`/`}>
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
                <Link to={`/`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Ví</span>}
                </Link>
              </Menu.Item>
            </Menu>

            {/* New Upload Button */}
            <div className="mt-8 w-full px-2 absolute bottom-28">
              <Button
                icon={<IconUploadFlat />}
                block
                className={`${!collapsed ? 'py-10' : 'py-6'
                  } border-[1px] border-blue-500 text-blue-500 hover:!bg-blue-100`}
              >
                {!collapsed && 'Tải Lên'}
              </Button>
            </div>

            {/* Logout Button */}
            <div className="mt-8 w-full px-2 absolute bottom-14 z-50">
              <Button
                icon={<IconLogoutFlash />}
                block
                className=" py-6 border-[1px] hover:!bg-red-100 hover:!text-red-500 hover:!border-red-500 border-red-500 text-red-500"
              >
                {!collapsed && 'Đăng Xuất'}
              </Button>
            </div>
          </div>
        </div>
      </Sider>
    </div>
  );
};

export default SideBarLeft;
