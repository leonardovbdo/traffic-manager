package com.leonardovbdo.traffic_manager_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leonardovbdo.traffic_manager_api.domain.Street.Street;

import java.util.Optional;

/**
 * Repositório JPA para entidade Street.
 * Define métodos de acesso aos dados relacionados a ruas, como busca por ID.
 */
public interface StreetRepository extends JpaRepository<Street, Long> {
    Optional<Street> findById(Long id);
}
