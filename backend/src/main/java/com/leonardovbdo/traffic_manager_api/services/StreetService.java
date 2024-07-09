package com.leonardovbdo.traffic_manager_api.services;

import com.leonardovbdo.traffic_manager_api.domain.Street.StreetResponseDTO;
import com.leonardovbdo.traffic_manager_api.infra.mapper.StreetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.leonardovbdo.traffic_manager_api.domain.Street.Street;
import com.leonardovbdo.traffic_manager_api.repositories.StreetRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StreetService {

    private final StreetRepository repository;
    private final StreetMapper streetMapper;

    /**
     * Busca uma rua pelo seu ID.
     *
     * @param id ID da rua a ser buscada
     * @return Entidade da rua encontrada
     * @throws RuntimeException se a rua não for encontrada
     */
    public Street findById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Street not found"));
    }

    /**
     * Retorna todas as ruas cadastradas.
     *
     * @return Lista de DTOs das ruas
     */
    public List<StreetResponseDTO> list() {
        return repository.findAll().stream().map(streetMapper::toDTO).collect(Collectors.toList());
    }
}
