package com.leonardovbdo.traffic_manager_api.domain.User;

/**
 * DTO (Data Transfer Object) usado para representar um usuário em requisições de API.
 * Contém os atributos necessários para apresentar os detalhes de um usuário específico,
 * incluindo seu identificador único (id), nome e email.
 */
public record UserDTO(Long id, String name, String email) {
}
