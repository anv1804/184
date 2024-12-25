import React from 'react';
import { Grade } from '../types/interfaces';

interface GradeTableProps {
  grades: Grade[];
}

const GradeTable: React.FC<GradeTableProps> = ({ grades }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Học Sinh</th>
          <th>Lớp</th>
          <th>Môn Học</th>
          <th>Kỳ Học</th>
          <th>Hệ Số 1</th>
          <th>Hệ Số 2</th>
          <th>Hệ Số 3</th>
          <th>Điểm Trung Bình</th>
        </tr>
      </thead>
      <tbody>
        {grades.map((grade) => (
          <tr key={grade.student._id}>
            <td>{grade.student.name}</td>
            <td>{grade.class}</td>
            <td>{grade.subject.name}</td>
            <td>{grade.semester}</td>
            <td>{grade.scores.coefficient1.join(', ')}</td>
            <td>{grade.scores.coefficient2.join(', ')}</td>
            <td>{grade.scores.coefficient3.join(', ')}</td>
            <td>{grade.average}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GradeTable; 