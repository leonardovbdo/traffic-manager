package com.leonardovbdo.traffic_manager_api.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.leonardovbdo.traffic_manager_api.domain.Report.Report;

import java.util.Optional;

/**
 * Repositório JPA para entidade Report.
 * Define métodos de acesso aos dados relacionados a ocorrências, como busca por ID, exclusão por ID
 * e busca paginada de ocorrências por email do usuário.
 */
public interface ReportRepository extends JpaRepository<Report, Long> {
    Optional<Report> findById(Long id);

    void deleteById(Long id);

    Page<Report> findByUserEmail(String email, Pageable pageable);
}
