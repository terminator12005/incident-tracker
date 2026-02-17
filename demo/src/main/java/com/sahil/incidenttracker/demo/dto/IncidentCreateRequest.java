package com.sahil.incidenttracker.demo.dto;

import com.sahil.incidenttracker.demo.entity.Severity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IncidentCreateRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Service is required")
    private String service;

    @NotNull(message = "Severity is required")
    private Severity severity;

    private String owner;
    private String summary;
}