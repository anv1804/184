import React from 'react'
import SideBarLeft from './SideBarLeft'
import SideBarRight from './SideBarRight'
import { Outlet } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import IconSearch from '../icons/IconSearch';
import IconMenuFlat from '../icons/IconMenuFlat';

const LayoutClient = () => {
  return (
    <div className='wrapper flex justify-between overflow-y-scroll scrollbar-hide'>
      <SideBarLeft />

      <div className="content bg-white overflow-y-scroll scrollbar-hide w-full">
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
          />
        </div>
        <div className="main">
        <Outlet />
        </div>
      </div>
      <SideBarRight />
    </div>
  )
}

export default LayoutClient