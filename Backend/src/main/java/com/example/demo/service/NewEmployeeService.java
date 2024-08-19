package com.example.demo.service;

import com.example.demo.exception.InvalidException;

import com.example.demo.exception.NotFoundException;
import com.example.demo.model.Department;
import com.example.demo.model.Employee;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewEmployeeService extends GenericService<Employee, Long>{
    @Autowired
    EmployeeRepository employeeRepository;
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    public NewEmployeeService(EmployeeRepository employeeRepository) {
        super(employeeRepository);
        this.employeeRepository = employeeRepository;
    }
    @Override
    protected void validateEntity(Employee employee) {
        if(employee.getName().isEmpty() || employee.getRole().isEmpty()){
            throw new InvalidException("Employee Name and Role must not be null");
        }
        if(employeeRepository.existsByName(employee.getName())){
            throw new InvalidException("Employee name must be unique");
        }
    }
    @Override
    public Employee save(Employee employee) {
        validateEntity(employee);
        Department department = departmentRepository.findById(employee.getDepartment().getId())
                .orElseThrow(() -> new NotFoundException("Department not found with id " + employee.getDepartment().getId()));
        employee.setDepartment(department);
        return repository.save(employee);
    }
    @Override
    public List<Employee> searchByNamePrefix(String prefix) {
        return ((EmployeeRepository) repository).findByNameStartingWithIgnoreCase(prefix);
    }
    public List<Employee> getEmployeesByRole(String role){
        List<Employee> employees = employeeRepository.findByRole(role);
        if(employees.isEmpty()){
            throw new NotFoundException("No Employees found with role "+ role);
        }
        return employees;
    }
}
