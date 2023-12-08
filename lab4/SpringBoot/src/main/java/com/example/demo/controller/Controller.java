package com.example.demo.controller;

import com.example.demo.dao.Person;
import com.example.demo.service.PersonServiceMpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Controller {
    @GetMapping("/")
    public ResponseEntity<String> giveString(@RequestParam(value = "name", defaultValue = "World") String name) {

        String string = String.format("Controller %s", name);
        return new ResponseEntity<>(string, HttpStatus.OK);
    }

    @Autowired
    private PersonServiceMpl persons;

    @GetMapping( value = {"/person", "/person/"})
    public ResponseEntity<List<Person>> person() {
        return new ResponseEntity<>(persons.getPersons(), HttpStatus.OK);
    }


    @GetMapping("/person/{id}")
    public ResponseEntity<Person> id(@PathVariable("id") int id) {
        return new ResponseEntity<>(persons.getPerson(id), HttpStatus.OK);
    }

    @PostMapping(value = "/create", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Person> create(@RequestBody Person person) {
        return new ResponseEntity<>(persons.create(person), HttpStatus.OK);
    }
}
