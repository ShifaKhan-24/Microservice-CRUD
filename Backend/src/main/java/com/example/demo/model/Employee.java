package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;


@Entity
@Table(name = "employees", uniqueConstraints = @UniqueConstraint(columnNames = "name"))
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true , name = "name")
    private String name;
    private String email;

    private String role;

    private Integer salary;

    private float experience;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "depID")
    @JsonBackReference
    private Department department;

    public Employee(String name,String email,String role,Integer salary,float experience,Department department){
        this.name = name;
        this.role = role;
        this.email = email;
        this.salary = salary;
        this.experience = experience;
        this.department = department;
    }

    public Employee() {

    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
    public Integer getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    public float getexperience() {
        return experience;
    }

    public void setexperience(float experience) {
        this.experience = experience;
    }
    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }



}
