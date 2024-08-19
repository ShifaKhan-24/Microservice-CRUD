import React from 'react'
import EntityService from './EntityService'

const DepartmentService = () => {
  return (
    <EntityService entityType={"departments"} apiUrl={'http://localhost:8081'}/>
  )
}

export default DepartmentService