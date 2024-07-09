package com.leonardovbdo.traffic_manager_api.infra.mapper;

import com.leonardovbdo.traffic_manager_api.domain.Street.Street;
import com.leonardovbdo.traffic_manager_api.domain.Street.StreetResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * Componente responsável por realizar a conversão entre entidades Street e DTOs StreetResponseDTO.
 */
@RequiredArgsConstructor
@Component
public class StreetMapper {

    /**
     * Converte um objeto Street para StreetResponseDTO.
     *
     * @param street O objeto Street a ser convertido.
     * @return O DTO StreetResponseDTO correspondente.
     */
    public StreetResponseDTO toDTO(Street street) {
        if (street == null) {
            return null;
        }
        return new StreetResponseDTO(street.getId(), street.getName());
    }
}
