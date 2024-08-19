package com.example.demo.controller;

import com.example.demo.model.Department;
import com.example.demo.model.Employee;
import com.example.demo.service.DepartmentService;
import com.example.demo.service.NewEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {
    @Autowired
    private NewEmployeeService employeeService;
    @Autowired
    private DepartmentService departmentService;
    @GetMapping
    public Page<Employee> getEntities(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "7") int size) {
        return employeeService.getPaginated(page, size);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.getByID(id);
        if (employee == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<Employee>> getEmployeesByRole(@PathVariable String role){
        List<Employee> employees = employeeService.getEmployeesByRole(role);
        return new ResponseEntity<>(employees,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        // Validate and set department
        Department department = departmentService.getByID(employee.getDepartment().getId());
        employee.setDepartment(department);

        Employee savedEmployee = employeeService.save(employee);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
        Employee employee = employeeService.getByID(id);
        // Validate and set department
        Department department = departmentService.getByID(employeeDetails.getDepartment().getId());
        employee.setDepartment(department);

        // Update other fields as needed
        employee.setName(employeeDetails.getName());
        employee.setRole(employeeDetails.getRole());
        // Set other fields

        Employee updatedEmployee = employeeService.save(employee);
        return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/search")
    public List<Employee> searchEmployees(@RequestParam String prefix) {
        return employeeService.searchByNamePrefix(prefix);
    }

}
