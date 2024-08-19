import React from 'react'
import EntityService from './EntityService'


const EmployeeService = () => {
  return (
    
    <EntityService entityType={"employees"}  apiUrl={'http://localhost:8081'}/>
    
  )
}

export default EmployeeService
