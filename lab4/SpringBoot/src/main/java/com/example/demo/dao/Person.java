package com.example.demo.dao;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.springframework.data.annotation.Id;
@Entity
public class Person {
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    public String name;
    public String surname;
    public String job;

    protected Person() {}
    public Person(String name, String surname, String job){
        this.name = name;
        this.surname = surname;
        this.job = job;
    }

    public Long getId() {
        return id;
    }

    public String getJob() {
        return job;
    }

    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }
    public void setJob(String job) {
        this.job = job;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public void setId(Long id) {
        this.id = id;
    }


    @Override
    public String toString() {
        return String.format(
                "Person [id=%d, name='%s', surname='%s', job='%s']", id, name, surname, job);
    }
}
