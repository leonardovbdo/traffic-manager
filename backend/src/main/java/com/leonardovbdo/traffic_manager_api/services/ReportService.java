package com.leonardovbdo.traffic_manager_api.services;

import java.util.List;
import java.util.stream.Collectors;

import com.leonardovbdo.traffic_manager_api.domain.Report.ReportPageDTO;
import com.leonardovbdo.traffic_manager_api.domain.Report.ReportResponseDTO;
import com.leonardovbdo.traffic_manager_api.infra.mapper.ReportMapper;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.leonardovbdo.traffic_manager_api.domain.Report.Report;
import com.leonardovbdo.traffic_manager_api.domain.Report.ReportRequestDTO;
import com.leonardovbdo.traffic_manager_api.repositories.ReportRepository;

import lombok.RequiredArgsConstructor;

/**
 * Serviço responsável pelas operações relacionadas aas ocorrências (Report) na aplicação.
 */
@Service
@RequiredArgsConstructor
public class ReportService {

    private final ReportRepository repository;
    private final ReportMapper reportMapper;

    /**
     * Cria um nova ocorrência com base nos dados fornecidos.
     *
     * @param data Dados da ocorrência a ser criada
     * @return a ocorrência criada
     */
    public Report create(ReportRequestDTO data) {
        Report newReport = reportMapper.toEntity(data);

        repository.save(newReport);
        return newReport;
    }

    /**
     * Lista as ocorrências paginadas de um usuário específico.
     *
     * @param page     Número da página (começando em 0)
     * @param pageSize Tamanho da página (máximo de 100)
     * @param email    E-mail do usuário para filtrar as ocorrências
     * @return DTO contendo a lista de ocorrências da página, total de elementos e total de páginas
     */
    public ReportPageDTO list(@PositiveOrZero int page, @Positive @Max(100) int pageSize, String email) {
        Page<Report> pageReport = repository.findByUserEmail(email, PageRequest.of(page, pageSize));
        List<ReportResponseDTO> reports = pageReport.getContent().stream().map(reportMapper::toDTO).collect(Collectors.toList());
        return new ReportPageDTO(reports, pageReport.getTotalElements(), pageReport.getTotalPages());
    }

    /**
     * Retorna todas as ocorrências existentes na base de dados.
     *
     * @return Lista de DTOs de ocorrências
     */
    public List<ReportResponseDTO> findAll() {
        return repository.findAll().stream().map(reportMapper::toDTO).collect(Collectors.toList());
    }

    /**
     * Busca uma ocorrência pelo seu ID.
     *
     * @param id ID da ocorrência a ser buscada
     * @return DTO da ocorrência encontrada
     * @throws RuntimeException se a ocorrência não for encontrada
     */
    public ReportResponseDTO findReportById(Long id) {
        Report report = repository.findById(id).orElseThrow(() -> new RuntimeException("Report not found."));
        return reportMapper.toDTO(report);
    }

    /**
     * Deleta uma ocorrência pelo seu ID.
     *
     * @param id ID da ocorrência a ser deletada
     */
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
