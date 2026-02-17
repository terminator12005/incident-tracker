package com.sahil.incidenttracker.demo.controller;

import com.sahil.incidenttracker.demo.dto.IncidentCreateRequest;
import com.sahil.incidenttracker.demo.dto.IncidentResponse;
import com.sahil.incidenttracker.demo.dto.IncidentUpdateRequest;
import com.sahil.incidenttracker.demo.entity.Severity;
import com.sahil.incidenttracker.demo.entity.Status;
import com.sahil.incidenttracker.demo.service.IncidentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/incidents")
@RequiredArgsConstructor
@CrossOrigin
public class IncidentController {

    private final IncidentService service;

    // CREATE INCIDENT
    @PostMapping
    public IncidentResponse createIncident(
            @Valid @RequestBody IncidentCreateRequest request) {
        return service.createIncident(request);
    }

    // GET ALL INCIDENTS (Pagination + Filtering + Search)
    @GetMapping
    public Page<IncidentResponse> getAllIncidents(
            @RequestParam(required = false) String serviceName,
            @RequestParam(required = false) Severity severity,
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        PageRequest pageRequest = PageRequest.of(page, size, sort);

        return service.getAllIncidents(serviceName, severity, status, search, pageRequest);
    }
    // GET INCIDENT BY ID
    @GetMapping("/{id:[0-9a-fA-F\\-]{36}}")
    public IncidentResponse getIncidentById(@PathVariable UUID id) {
        return service.getIncidentById(id);
    }


    // UPDATE INCIDENT
    @PatchMapping("/{id}")
    public IncidentResponse updateIncident(
            @PathVariable UUID id,
            @RequestBody IncidentUpdateRequest request) {
        return service.updateIncident(id, request);
    }
    @GetMapping("/stats")
    public Map<String, Long> getIncidentStats() {
        return service.getStats();
    }

}
