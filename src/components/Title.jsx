import React from 'react'

function Title({ registeredStudents, activeStudents }) {
    return (
        <h1 className='title'>Hay {activeStudents} estudiantes activos, de {registeredStudents} estudiantes registrados</h1>
    )
}

export default Title