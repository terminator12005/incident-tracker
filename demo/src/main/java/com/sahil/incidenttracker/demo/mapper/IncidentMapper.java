package com.sahil.incidenttracker.demo.mapper;

import com.sahil.incidenttracker.demo.dto.IncidentResponse;
import com.sahil.incidenttracker.demo.entity.Incident;

public class IncidentMapper {

    public static IncidentResponse toResponse(Incident incident) {
        return IncidentResponse.builder()
                .id(incident.getId())
                .title(incident.getTitle())
                .service(incident.getService())
                .severity(incident.getSeverity())
                .status(incident.getStatus())
                .owner(incident.getOwner())
                .summary(incident.getSummary())
                .createdAt(incident.getCreatedAt())
                .updatedAt(incident.getUpdatedAt())
                .build();
    }
}
