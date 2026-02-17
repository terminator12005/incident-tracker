package com.sahil.incidenttracker.demo;

import com.sahil.incidenttracker.demo.entity.Incident;
import com.sahil.incidenttracker.demo.entity.Severity;
import com.sahil.incidenttracker.demo.entity.Status;
import com.sahil.incidenttracker.demo.repository.IncidentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Random;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    CommandLineRunner seedData(IncidentRepository repository) {
        return args -> {

            if (repository.count() > 0) {
                return;
            }

            Random random = new Random();

            for (int i = 1; i <= 200; i++) {

                Incident incident = Incident.builder()
                        .title("Incident " + i)
                        .service("Service-" + (i % 5))
                        .severity(Severity.values()[random.nextInt(4)])
                        .status(Status.values()[random.nextInt(3)])
                        .owner("User-" + i)
                        .summary("Sample summary for incident " + i)
                        .build();

                repository.save(incident);
            }
        };
    }
}
