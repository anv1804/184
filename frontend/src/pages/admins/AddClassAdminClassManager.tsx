import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import ClassForm from '../../components/Class/ClassForm';

const AddClassAdminClassManager: React.FC = () => {
  return (
    <div className="p-4">
      <ClassForm/>
    </div>
  );
};

export default AddClassAdminClassManager; 