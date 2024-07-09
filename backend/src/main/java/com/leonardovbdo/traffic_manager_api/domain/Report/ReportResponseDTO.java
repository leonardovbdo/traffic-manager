package com.leonardovbdo.traffic_manager_api.domain.Report;

import com.leonardovbdo.traffic_manager_api.domain.Street.StreetResponseDTO;
import com.leonardovbdo.traffic_manager_api.domain.TypeOccurrence.TypeReportResponseDTO;
import com.leonardovbdo.traffic_manager_api.domain.User.UserDTO;

import java.time.LocalDateTime;

/**
 * DTO (Data Transfer Object) usado para representar uma ocorrência em respostas de API.
 * Contém os atributos necessários para apresentar os detalhes de uma ocorrência específica,
 * incluindo informações sobre o tipo de ocorrência, usuário responsável, rua (opcional),
 * e coordenadas geográficas.
 */
public record ReportResponseDTO(
    Long id,
    String title,
    String description,
    String location,
    TypeReportResponseDTO typeReport,
    LocalDateTime dateTime,
    UserDTO user,
    StreetResponseDTO street,
    String latitude,
    String longitude
) {
}
