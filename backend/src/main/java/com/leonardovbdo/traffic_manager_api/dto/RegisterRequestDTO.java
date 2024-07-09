package com.leonardovbdo.traffic_manager_api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * DTO que representa os dados de requisição para o registro de um novo usuário.
 */
public record RegisterRequestDTO(
        @NotNull @NotBlank String name,
        @NotNull @NotBlank @Email String email,
        @NotNull @NotBlank String password) {
}
