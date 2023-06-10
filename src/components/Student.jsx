import React from 'react'

function Student({ id, name, carreer, active, handleStudentStateChange, handleEditStudent, handleDeleteStudent }) {
  return (
    <tr>
      <td>{name}</td>
      <td>{carreer}</td>
      <td>
        <button onClick={() => handleStudentStateChange(id)} className={`button--${active ? 'active' : 'inactive'}`}>
          {active ? 'Activo' : 'Inactivo'}
        </button>
        <button onClick={() => handleEditStudent({ id, name, carreer, active })} className='btnModalEdit'>Editar</button>
        <button onClick={() => handleDeleteStudent(id)} className='btnModalDelete'>Eliminar</button>
      </td>
    </tr>
  );
}

export default Student