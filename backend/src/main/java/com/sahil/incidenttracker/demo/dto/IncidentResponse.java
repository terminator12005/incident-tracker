package com.sahil.incidenttracker.demo.dto;

import com.sahil.incidenttracker.demo.entity.Severity;
import com.sahil.incidenttracker.demo.entity.Status;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
public class IncidentResponse {

    private UUID id;
    private String title;
    private String service;
    private Severity severity;
    private Status status;
    private String owner;
    private String summary;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
