package com.leonardovbdo.traffic_manager_api.domain.Street;

/**
 * DTO (Data Transfer Object) usado para representar uma rua em respostas de API.
 * Contém os atributos necessários para apresentar os detalhes de uma rua específica,
 * incluindo seu identificador único (id) e nome.
 */
public record StreetResponseDTO(Long id, String name) {
}
