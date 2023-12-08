package com.example.demo;

import com.example.demo.dao.Person;
import com.example.demo.repository.PersonsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	private static final Logger log = LoggerFactory.getLogger(DemoApplication.class);
	@Bean
	public CommandLineRunner demo(PersonsRepository repository) {
		return (args) -> {
			// save a few customers
			repository.save(new Person("John", "Doe", "IT"));
			repository.save(new Person("John", "Smith", "tester"));
			// fetch all customers
			log.info("Customers found with findAll():");
			log.info("-------------------------------");
			repository.findAll().forEach(customer -> {
				log.info(customer.toString());
			});
		};
	}

}
