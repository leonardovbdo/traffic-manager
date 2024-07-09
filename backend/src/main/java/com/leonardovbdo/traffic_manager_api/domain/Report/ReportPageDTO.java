package com.leonardovbdo.traffic_manager_api.domain.Report;

import java.util.List;

/**
 * DTO (Data Transfer Object) para representar uma página de ocorrências retornada como resposta.
 * Contém uma lista de ocorrências representados por ReportResponseDTO, o número total de elementos e o total de páginas.
 */
public record ReportPageDTO(List<ReportResponseDTO> reports, Long totalElements, int totalPages) {
}
