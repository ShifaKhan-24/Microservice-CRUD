package com.example.demo.service;

import com.example.demo.exception.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public abstract class GenericService<T, ID> {
    protected final JpaRepository<T, ID> repository;

    public GenericService(JpaRepository<T, ID> repository) {
        this.repository = repository;
    }

    // Get Paginated
    public Page<T> getPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAll(pageable);
    }
    //Get By ID
    public T getByID(ID id) {
        return repository.findById(id)
                .orElseThrow(() ->new NotFoundException("Entity not found with id "+ id));
    }

    //Save entity
    public T save(T entity ){
            validateEntity(entity);
            return repository.save(entity);

    }
    //Delete Entity
    public void deleteById(ID id){
        if(repository.findById(id).isEmpty()){
            throw new NotFoundException("Entity not found with id "+ id);
        }
         repository.deleteById(id);
    }
    // Search by prefix
    public abstract List<T> searchByNamePrefix(String prefix);
    protected abstract void validateEntity(T entity);



}
