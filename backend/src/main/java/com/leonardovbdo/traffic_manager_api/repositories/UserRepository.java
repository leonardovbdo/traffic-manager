package com.leonardovbdo.traffic_manager_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leonardovbdo.traffic_manager_api.domain.User.User;

import java.util.Optional;

/**
 * Repositório JPA para entidade User.
 * Define métodos de acesso aos dados relacionados a usuários, como busca por email.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
