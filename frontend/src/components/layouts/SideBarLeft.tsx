import React, { useState, useEffect } from 'react';
import { Layout, Menu, Badge, Avatar, Button, Input } from 'antd';
import 'tailwindcss/tailwind.css';
import IconCalendarFlat from '../icons/IconCalendarFlat';
import IconBagFlat from '../icons/IconBagFlat';
import IconChatFlat from '../icons/IconChatFlat';
import IconCompany from '../icons/IconCompany';
import IconFileFlat from '../icons/IconFileFlat';
import IconPayFlat from '../icons/IconPayFlat';
import IconNavigatFlat from '../icons/IconNavigatFlat';
import { Link } from 'react-router-dom';
import IconLogoutFlash from '../icons/IconLogoutFlash';
import IconUploadFlat from '../icons/IconUploadFlat';
import IconMenuFlat from '../icons/IconMenuFlat';
import { useSidebar } from '../../helper/sidebarHelper';
import { PlusOutlined } from '@ant-design/icons';
import IconSearch from '../icons/IconSearch';

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
            <div className={`text-blue-500 text-2xl font-semibold mb-4 ${collapsed ? 'text-2xl' : ''}`}>
              Teach.
            </div>

            {/* User Profile */}
            <div
              className={`flex gap-2 w-[80%] items-center justify-start pb-4 border-b-[1px] ${collapsed ? 'justify-center' : ''
                }`}
            >
              <Avatar size={collapsed ? 48 : 48} src="https://via.placeholder.com/64" />
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
              <Menu.Item key="1" icon={<IconNavigatFlat />}>
                <Link to={`/`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Trang Chủ</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<IconCalendarFlat />}>
                <Link to={`/lich-trinh`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Lịch Trình</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<IconBagFlat />}>
                <Link to={`/lop-hoc`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Lớp Học</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<IconChatFlat />}>
                <Link to={`/tro-chuyen`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Trò Chuyện</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<IconCompany />}>
                <Link to={`/`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Trang Chủ</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<IconFileFlat />}>
                <Link to={`/tai-lieu`}>
                  {collapsed ? <span className="ml-0"></span> : <span className="ml-2">Tài Liệu</span>}
                </Link>
              </Menu.Item>
              <Menu.Item key="7" icon={<IconPayFlat />}>
                <Link to={`/vi`}>
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
