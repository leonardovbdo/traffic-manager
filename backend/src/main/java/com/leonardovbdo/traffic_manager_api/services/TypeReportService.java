package com.leonardovbdo.traffic_manager_api.services;

import com.leonardovbdo.traffic_manager_api.domain.TypeOccurrence.TypeReportResponseDTO;
import com.leonardovbdo.traffic_manager_api.infra.mapper.TypeReportMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.leonardovbdo.traffic_manager_api.domain.TypeOccurrence.TypeReport;
import com.leonardovbdo.traffic_manager_api.repositories.TypeReportRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TypeReportService {

    private final TypeReportRepository repository;
    private final TypeReportMapper typeReportMapper;

    /**
     * Busca um tipo de ocorrência pelo seu ID.
     *
     * @param id ID do tipo de ocorrência a ser buscado
     * @return Entidade do tipo de ocorrência encontrada
     * @throws RuntimeException se o tipo de ocorrência não for encontrado
     */
    public TypeReport findById(Long id) {
        TypeReport typeReport = repository.findById(id).orElseThrow(() -> new RuntimeException("Type Report not found"));
        return typeReport;
    }

    /**
     * Retorna todos os tipos de ocorrências cadastrados.
     *
     * @return Lista de DTOs dos tipos de ocorrências
     */
    public List<TypeReportResponseDTO> list() {
        return repository.findAll().stream().map(typeReportMapper::toDTO).collect(Collectors.toList());
    }
}
