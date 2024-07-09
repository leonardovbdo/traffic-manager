package com.leonardovbdo.traffic_manager_api.infra.mapper;

import com.leonardovbdo.traffic_manager_api.domain.TypeOccurrence.TypeReport;
import com.leonardovbdo.traffic_manager_api.domain.TypeOccurrence.TypeReportResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * Componente responsável por realizar a conversão entre entidades TypeReport e DTOs TypeReportResponseDTO.
 */
@RequiredArgsConstructor
@Component
public class TypeReportMapper {

    /**
     * Converte um objeto TypeReport para TypeReportResponseDTO.
     *
     * @param typeReport O objeto TypeReport a ser convertido.
     * @return O DTO TypeReportResponseDTO correspondente.
     */
    public TypeReportResponseDTO toDTO(TypeReport typeReport) {
        if (typeReport == null) {
            return null;
        }
        return new TypeReportResponseDTO(typeReport.getId(), typeReport.getDescription());
    }
}
