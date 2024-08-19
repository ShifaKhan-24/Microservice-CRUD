package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "department")
public class Department {
    @Id
    @Column(name = "depID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    String name;
    String location;
    String manager;
    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true,mappedBy = "department")
    @JsonManagedReference
    private List<Employee> employees= new ArrayList<>();
    public Department() {
    }
    public Department(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setID(Long id) {
        this.id = id;
    }

    public void setName(String name) {
       this.name = name;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }
    public String getManager() {
        return manager;
    }

    public void setManager(String manager) {
        this.manager = manager;
    }

}
