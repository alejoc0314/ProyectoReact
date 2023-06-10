import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Title from './components/Title';
import Table from './components/Table';
import Modal from './components/Modal';
import Form from './components/Form';

import './App.css';

function App() {

  // Se definen los estados

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Se obtenien los estudiantes desde el Local Storage

  useEffect(() => {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);

  // se define el termino de búsqueda

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // se define la función para abrir la ventana modal

  const openModal = () => {
    setShowModal(true);
  };

  // se define la función para cerrar la venta modal

  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  // se define el estudiante que se selecciona para ser editado

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
  };

  // se define la función para agregar un nuevo estudiante

  const handleFormSubmit = (event, formData) => {
    event.preventDefault();
    const newStudent = {
      id: Date.now(),
      name: formData.estudiante,
      curso: formData.curso,
      active: true,
    };
    setStudents([...students, newStudent]);
    localStorage.setItem('students', JSON.stringify([...students, newStudent]));
    setShowModal(false);
  };

  // se define la función para editar un estudiante

  const handleFormEdit = (event, formData) => {
    event.preventDefault();
    if (selectedStudent) {
      const updatedStudents = students.map((student) => {
        if (student.id === selectedStudent.id) {
          return {
            ...student,
            name: formData.estudiante,
            curso: formData.curso,
          };
        }
        return student;
      });

      setStudents(updatedStudents);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
    }
    setShowModal(false);
    setSelectedStudent(null);
  };

  // se define la función para eliminar un estudiante

  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  // se define una función para cambiar el estado del estudiante

  const handleStudentStateChange = (id) => {
    const updatedStudents = students.map((student) => {
      if (student.id === id) {
        const isActive = student.active;
        return {
          ...student,
          active: !isActive,
        };
      }
      return student;
    });

    const activeStudentCount = updatedStudents.filter((student) => student.active).length;

    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    setTitle({ registeredStudents: students.length, activeStudents: activeStudentCount });
  };

  const filteredStudents = students.filter((student) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      student.curso.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <>
      <div className='container'>
        <div className='tableHeader'>
          <Title
            registeredStudents={students.length}
            activeStudents={students.filter((student) => student.active).length}
          />
          <div className='searchStudent'>
            <input
              placeholder='Buscar Estudiante'
              className='inputStudent'
              type='text'
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FontAwesomeIcon className='searchIcon' icon={faSearch} />
          </div>
          <button id='btnModalAdd' className='btnModalAdd' onClick={openModal}>
            Agregar Estudiante
          </button>
        </div>
        <div className='tableBox'>
          <Table
            students={filteredStudents}
            handleStudentStateChange={handleStudentStateChange}
            handleEditStudent={handleEditStudent}
            handleDeleteStudent={handleDeleteStudent}
          />
        </div>
      </div>
      {showModal && (
        <Modal closeModal={closeModal}>
          <Form
            title='Registrar estudiante'
            fields={[
              {
                name: 'estudiante',
                type: 'text',
                label: 'Ingrese el nombre del estudiante',
              },
              {
                name: 'curso',
                type: 'text',
                label: 'Ingrese el curso del estudiante',
              },
            ]}
            onSubmit={handleFormSubmit}
            buttonText='Agregar Estudiante'
            buttonClass='btnModalAdd'
          />
        </Modal>
      )}
      {selectedStudent && (
        <Modal closeModal={closeModal}>
          <Form
            title='Editar estudiante'
            fields={[
              {
                name: 'estudiante',
                type: 'text',
                label: selectedStudent.name,
                initialValue: selectedStudent.name,
              },
              {
                name: 'curso',
                type: 'text',
                label: selectedStudent.carreer,
                initialValue: selectedStudent.carreer,
              },
            ]}
            onSubmit={handleFormEdit}
            buttonText='Actualizar Estudiante'
            buttonClass='btnModalEdit'
          />
        </Modal>
      )}
    </>
  );
}

export default App;
