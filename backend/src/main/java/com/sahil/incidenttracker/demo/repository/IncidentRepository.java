package com.sahil.incidenttracker.demo.repository;


import com.sahil.incidenttracker.demo.entity.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.sahil.incidenttracker.demo.entity.Status;
import com.sahil.incidenttracker.demo.entity.Severity;

import java.util.UUID;

public interface IncidentRepository extends
        JpaRepository<Incident, UUID>,
        JpaSpecificationExecutor<Incident> {
    long countByStatus(Status status);

    long countBySeverity(Severity severity);
}