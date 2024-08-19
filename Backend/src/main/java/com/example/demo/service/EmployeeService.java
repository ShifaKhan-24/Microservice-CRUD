//package com.example.demo.service;
//
//import com.example.demo.exception.InvalidException;
//import com.example.demo.exception.NotFoundException;
//import com.example.demo.model.Employee;
//import com.example.demo.repository.EmployeeRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.dao.DataIntegrityViolationException;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class EmployeeService {
//    @Autowired
//    private EmployeeRepository employeeRepository;
//
//    public List<Employee> getAllEmployees() {
//        return employeeRepository.findAll();
//    }
//
//    public List<Employee> getEmployeesByRole(String role){
//        List<Employee> employees = employeeRepository.findByRole(role);
//        if(employees.isEmpty()){
//            throw new NotFoundException("No Employees found with role "+ role);
//        }
//        return employees;
//    }
//    public Employee getEmployeeById(Long id) {
//        return employeeRepository.findById(id)
//                .orElseThrow(() -> new NotFoundException("Employee not found with id " + id));
//    }
//
//    public Employee saveEmployee(Employee employee) {
//        if (employee.getName().isEmpty() || employee.getRole().isEmpty() ) {
//            throw new InvalidException("Employee name and role must not be null");
//        }
//
//        // Check if an employee with the same name already exists
//        if (employeeRepository.existsByName(employee.getName())) {
//            throw new InvalidException("Employee name must be unique");
//        }
//
//        return employeeRepository.save(employee);
//    }
//
//
//    public void deleteEmployee(Long id) {
//        if (!employeeRepository.existsById(id)) {
//            throw new NotFoundException("Employee not found with id " + id);
//        }
//        employeeRepository.deleteById(id);
//    }
//}
