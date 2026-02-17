package com.sahil.incidenttracker.demo.dto;


import com.sahil.incidenttracker.demo.entity.Status;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IncidentUpdateRequest {

    private Status status;
    private String owner;
    private String summary;
}
