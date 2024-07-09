package com.leonardovbdo.traffic_manager_api.domain.TypeOccurrence;

/**
 * DTO (Data Transfer Object) usado para representar um tipo de ocorrência em respostas de API.
 * Contém os atributos necessários para apresentar os detalhes de um tipo de ocorrência específico,
 * incluindo seu identificador único (id) e descrição.
 */
public record TypeReportResponseDTO(Long id, String description) {
}
