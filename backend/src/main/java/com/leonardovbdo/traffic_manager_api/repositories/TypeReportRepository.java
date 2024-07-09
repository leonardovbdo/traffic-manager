package com.leonardovbdo.traffic_manager_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leonardovbdo.traffic_manager_api.domain.TypeOccurrence.TypeReport;

import java.util.Optional;

/**
 * Repositório JPA para entidade TypeReport.
 * Define métodos de acesso aos dados relacionados aos tipos de ocorrência, como busca por ID.
 */
public interface TypeReportRepository extends JpaRepository<TypeReport, Long> {
    Optional<TypeReport> findById(Long id);
}
