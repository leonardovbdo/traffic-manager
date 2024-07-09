package com.leonardovbdo.traffic_manager_api.domain.Report;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

/**
 * DTO (Data Transfer Object) usado para receber requisições de criação ou atualização de ocorrências.
 * Contém os campos necessários para criar ou atualizar uma ocorrência, com validações de não nulo e não vazio
 * para garantir integridade dos dados.
 */
public record ReportRequestDTO(
    @NotBlank(message = "can't be null") String title,
    @NotBlank(message = "can't be null") String description,
    @NotBlank(message = "can't be null") String location,
    @NotNull(message = "can't be null") Long typeReport,
    @NotNull(message = "can't be null") LocalDateTime dateTime,
    @NotBlank(message = "can't be null") String userEmail,
    Long street,
    @NotBlank(message = "can't be null") String latitude,
    @NotBlank(message = "can't be null") String longitude
) {}
