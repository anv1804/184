import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AdminSideBarLeft from './elements/admin/AdminSideBarLeft';

const LayoutAdmin = () => {

  return (
    <Layout className="h-screen">
      <AdminSideBarLeft   />
      <Layout>
        <div className="px-4">
          <Outlet/>
        </div>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
