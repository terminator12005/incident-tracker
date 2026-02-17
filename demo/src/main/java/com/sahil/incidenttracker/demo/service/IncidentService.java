package com.sahil.incidenttracker.demo.service;
import com.sahil.incidenttracker.demo.specification.IncidentSpecification;
import com.sahil.incidenttracker.demo.entity.Severity;
import com.sahil.incidenttracker.demo.entity.Status;
import org.springframework.data.jpa.domain.Specification;

import com.sahil.incidenttracker.demo.dto.IncidentCreateRequest;
import com.sahil.incidenttracker.demo.dto.IncidentResponse;
import com.sahil.incidenttracker.demo.dto.IncidentUpdateRequest;
import com.sahil.incidenttracker.demo.entity.Incident;
import com.sahil.incidenttracker.demo.entity.Status;
import com.sahil.incidenttracker.demo.mapper.IncidentMapper;
import com.sahil.incidenttracker.demo.repository.IncidentRepository;
import com.sahil.incidenttracker.demo.specification.IncidentSpecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class IncidentService {

    private final IncidentRepository repository;

    // CREATE INCIDENT
    public IncidentResponse createIncident(IncidentCreateRequest request) {

        Incident incident = Incident.builder()
                .title(request.getTitle())
                .service(request.getService())
                .severity(request.getSeverity())
                .status(Status.OPEN)
                .owner(request.getOwner())
                .summary(request.getSummary())
                .build();

        return IncidentMapper.toResponse(repository.save(incident));
    }
    public Map<String, Long> getStats() {

        Map<String, Long> stats = new HashMap<>();

        stats.put("OPEN", repository.countByStatus(Status.OPEN));
        stats.put("MITIGATED", repository.countByStatus(Status.MITIGATED));
        stats.put("RESOLVED", repository.countByStatus(Status.RESOLVED));

        stats.put("SEV1", repository.countBySeverity(Severity.SEV1));
        stats.put("SEV2", repository.countBySeverity(Severity.SEV2));
        stats.put("SEV3", repository.countBySeverity(Severity.SEV3));
        stats.put("SEV4", repository.countBySeverity(Severity.SEV4));

        return stats;
    }

    public Page<IncidentResponse> getAllIncidents(
            String service,
            Severity severity,
            Status status,
            String search,
            Pageable pageable
    ) {

        Specification<Incident> specification =
                IncidentSpecification.filter(service, severity, status, search);

        return repository.findAll(specification, pageable)
                .map(IncidentMapper::toResponse);
    }



    // GET BY ID
    public IncidentResponse getIncidentById(java.util.UUID id) {
        Incident incident = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Incident not found"));

        return IncidentMapper.toResponse(incident);
    }

    // UPDATE INCIDENT (PATCH style)
    public IncidentResponse updateIncident(java.util.UUID id, IncidentUpdateRequest request) {

        Incident incident = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Incident not found"));

        if (request.getStatus() != null) {
            incident.setStatus(request.getStatus());
        }

        if (request.getOwner() != null) {
            incident.setOwner(request.getOwner());
        }

        if (request.getSummary() != null) {
            incident.setSummary(request.getSummary());
        }

        return IncidentMapper.toResponse(repository.save(incident));
    }
}
