package com.example.demo.service;

import com.example.demo.exception.InvalidException;
import com.example.demo.exception.NotFoundException;
import com.example.demo.model.Department;
import com.example.demo.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentService extends GenericService<Department, Long>{
    @Autowired
    private DepartmentRepository departmentRepository;
    @Autowired
    public DepartmentService(DepartmentRepository departmentRepository){
        super(departmentRepository);
    }

    public Department updateDepartment(Long id, Department departmentDetails) {
        Department existingDepartment = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Department not found with id " + id));
        existingDepartment.setName(departmentDetails.getName());
        existingDepartment.setLocation(departmentDetails.getLocation());
        // Update other fields as necessary
        return departmentRepository.save(existingDepartment);
    }


    @Override
    public List<Department> searchByNamePrefix(String prefix) {
        return ((DepartmentRepository) repository).findByNameStartingWithIgnoreCase(prefix);
    }
    @Override
    protected void validateEntity(Department department) {
        if(department.getName().isEmpty() ) throw new InvalidException("Department Name must not be null");
    }

}
