import React from 'react';
import { ClassroomProvider } from '../../context/ClassroomContext';
import ClassroomTable from '../../components/ClassroomTable';
import ClassroomOverview from '../../components/ClassroomOverview';

const Classroom: React.FC = () => {
  return (
    <ClassroomProvider>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-semibold mb-4">Classroom Management</h2>
        <ClassroomTable />
        <div className="mt-4">
          <ClassroomOverview />
        </div>
      </div>
    </ClassroomProvider>
  );
};

export default Classroom;
