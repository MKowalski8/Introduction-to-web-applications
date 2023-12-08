package com.example.demo.service;

import com.example.demo.dao.Person;
import com.example.demo.repository.PersonsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonServiceMpl implements PersonService {
    @Autowired
    private PersonsRepository personsRepository;

    @Override
    public List<Person> getPersons() {
        return personsRepository.findAll();
    }

    @Override
    public Person getPerson(String surname) {
        List<Person> persons = getPersons();

        for (Person person : persons) {
            if (surname.equals(person.surname)) {
                return person;
            }
        }

        return null;
    }

    @Override
    public Person create(Person person) {
        personsRepository.save(person);
        return person;
    }

    @Override
    public Person getPerson(int id) {
        List<Person> persons = getPersons();

        for (Person person : persons) {
            if (person.id == id) {
                return person;
            }
        }
        return null;
    }
}
