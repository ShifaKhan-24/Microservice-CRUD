package com.example.demo.controller;

import com.example.demo.model.Department;
import com.example.demo.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/departments")
public class DepartmentController  {
   @Autowired
   private DepartmentService departmentService;

    @GetMapping
    public Page<Department> getEntities(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "7") int size) {
        return departmentService.getPaginated(page, size);
    }

    @GetMapping("/{Dep_ID}")
    public ResponseEntity<Department> getDepartmentByID(@PathVariable Long Dep_ID) {
        Department department = departmentService.getByID(Dep_ID);
        if (department == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(department, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        Department createdDepartment = departmentService.save(department);
        return new ResponseEntity<>(createdDepartment, HttpStatus.CREATED);
    }
    @PutMapping("/{Dep_ID}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Long Dep_ID, @RequestBody Department departmentDetails) {
        Department updatedDepartment = departmentService.getByID(Dep_ID);
        updatedDepartment.setName(departmentDetails.getName());
        updatedDepartment.setLocation(departmentDetails.getLocation());
        updatedDepartment.setManager(departmentDetails.getManager());
        departmentService.save(updatedDepartment);
        return new ResponseEntity<>(updatedDepartment, HttpStatus.OK);
    }
    @DeleteMapping("/{Dep_ID}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long Dep_ID) {
        departmentService.deleteById(Dep_ID);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/search")
    public List<Department> searchDepartments(@RequestParam String prefix) {
        return departmentService.searchByNamePrefix(prefix);
    }

}
