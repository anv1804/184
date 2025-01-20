import React, { useState } from 'react';
import SideBarRight from './elements/client/SideBarRight'
import { Outlet, useLocation } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input, Breadcrumb } from 'antd';
import IconSearch from '../icons/IconSearch';
import IconMenuFlat from '../icons/IconMenuFlat';
import SideBarLeft from './elements/client/SideBarLeft';

const LayoutClient = () => {
  const [isSidebarLeftVisible, setSidebarLeftVisible] = useState(true);
  const location = useLocation();

  const getBreadcrumb = () => {
    switch (location.pathname) {
      case '/profile':
        return [
          { title: 'Trang Chủ', path: '/' },
          { title: 'Profile', path: '/profile' },
        ];
      case '/classroom':
        return [
          { title: 'Trang Chủ', path: '/' },
          { title: 'Lớp Học', path: '/classroom' },
        ];
      default:
        return [{ title: 'Trang Chủ', path: '/' }];
    }
  };

  const breadcrumbItems = getBreadcrumb();

  return (
    <div className='wrapper '>
      {isSidebarLeftVisible && <SideBarLeft />}
      <div className={`content bg-white overflow-y-scroll scrollbar-hide flex-1 h-[100vh]`}>
        <div className="flex items-center justify-between p-4 border-b-[1px] sticky top-0 bg-white z-[1000]">
          <div className="flex items-center w-full border rounded-lg ">
            <Input
              placeholder="Search"
              prefix={<IconSearch />}
              bordered={false}
              className="w-full px-2 py-2 text-gray-600"
            />
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="ml-4 md:block hidden bg-blue-100 text-blue-500 border-none rounded-full px-4 py-2"
          >
            New Upload
          </Button>
          <Button
            className="ml-4 md:hidden block z-50"
            icon={<IconMenuFlat />}
            onClick={() => setSidebarLeftVisible(!isSidebarLeftVisible)}
          />
        </div>

        <Breadcrumb className="p-4">
          {breadcrumbItems.map((item, index) => (
            <Breadcrumb.Item key={index}>
              <a href={item.path}>{item.title}</a>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>

        <div className="main">
          <Outlet />
        </div>
      </div>
      <SideBarRight />
    </div>
  )
}

export default LayoutClient