package com.sahil.incidenttracker.demo.specification;

import com.sahil.incidenttracker.demo.entity.Incident;
import com.sahil.incidenttracker.demo.entity.Severity;
import com.sahil.incidenttracker.demo.entity.Status;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

public class IncidentSpecification {

    public static Specification<Incident> filter(
            String service,
            Severity severity,
            Status status,
            String search
    ) {

        return (root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (service != null && !service.isEmpty()) {
                predicates.add(cb.equal(root.get("service"), service));
            }

            if (severity != null) {
                predicates.add(cb.equal(root.get("severity"), severity));
            }

            if (status != null) {
                predicates.add(cb.equal(root.get("status"), status));
            }

            if (search != null && !search.isEmpty()) {

                String pattern = "%" + search.toLowerCase() + "%";

                Predicate titleMatch =
                        cb.like(cb.lower(root.get("title")), pattern);

                Predicate summaryMatch =
                        cb.like(cb.lower(root.get("summary")), pattern);

                predicates.add(cb.or(titleMatch, summaryMatch));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
