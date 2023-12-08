package com.example.demo.repository;

import com.example.demo.dao.Person;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.yaml.snakeyaml.events.Event;

import java.util.List;
@Repository
public interface PersonsRepository extends CrudRepository<Person, Long> {
    @Override
    List<Person> findAll();
}
