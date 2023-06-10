import React, { useState, useEffect } from 'react';
import Student from './Student';

function Table({ students, handleStudentStateChange, handleEditStudent, handleDeleteStudent }) {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    setStudentList(students);
  }, [students]);

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Carrera</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {studentList.map((student) => (
          <Student
            key={student.id}
            id={student.id} 
            name={student.name}
            carreer={student.curso}
            active={student.active}
            handleStudentStateChange={handleStudentStateChange}
            handleEditStudent={handleEditStudent}
            handleDeleteStudent={handleDeleteStudent}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;