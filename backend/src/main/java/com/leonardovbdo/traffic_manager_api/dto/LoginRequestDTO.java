package com.leonardovbdo.traffic_manager_api.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * DTO que representa os dados de requisição para autenticação de login.
 */
public record LoginRequestDTO(
        @NotNull @NotBlank @Email String email,
        @NotNull @NotBlank String password) {

}
