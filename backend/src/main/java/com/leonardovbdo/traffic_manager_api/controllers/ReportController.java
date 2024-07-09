package com.leonardovbdo.traffic_manager_api.controllers;

import com.leonardovbdo.traffic_manager_api.domain.Report.ReportPageDTO;
import com.leonardovbdo.traffic_manager_api.domain.Report.ReportResponseDTO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.web.bind.annotation.*;

import com.leonardovbdo.traffic_manager_api.domain.Report.Report;
import com.leonardovbdo.traffic_manager_api.domain.Report.ReportRequestDTO;
import com.leonardovbdo.traffic_manager_api.services.ReportService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    /**
     * Cria um nova ocorrência.
     *
     * @param data Dados da ocorrência a ser criada
     * @return ResponseEntity com a ocorrência criada e status HTTP 201 (Created)
     */
    @PostMapping()
    public ResponseEntity<Report> createReport(@Valid @RequestBody ReportRequestDTO data) {
        Report newReport = reportService.create(data);
        return new ResponseEntity<>(newReport, HttpStatus.CREATED);
    }

    /**
     * Lista as ocorrências paginadas de acordo com o email do usuário.
     *
     * @param page     Página solicitada (padrão é 0)
     * @param pageSize Tamanho da página (padrão é 10, máximo é 100)
     * @param email    Email do usuário para filtrar as ocorrências
     * @return ResponseEntity com a página de ocorrências e status HTTP 200 (OK)
     */
    @GetMapping()
    public ResponseEntity<ReportPageDTO> list(@RequestParam(defaultValue = "0") @PositiveOrZero int page,
                                              @RequestParam(defaultValue = "10") @Positive @Max(100) int pageSize,
                                              @RequestParam(required = true) String email) {
        return new ResponseEntity<>(reportService.list(page, pageSize, email), HttpStatus.OK);
    }

    /**
     * Obtém uma ocorrência pelo seu ID.
     *
     * @param id ID da ocorrência a ser obtida
     * @return ResponseEntity com a ocorrência encontrada e status HTTP 200 (OK)
     */
    @GetMapping("/{id}")
    public ResponseEntity<ReportResponseDTO> getReportById(@PathVariable("id") Long id) {
        return new ResponseEntity<>(reportService.findReportById(id), HttpStatus.OK);
    }

    /**
     * Deleta uma ocorrência pelo seu ID.
     *
     * @param id ID da ocorrência a ser deletada
     * @return ResponseEntity com status HTTP 200 (OK)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReportById(@PathVariable("id") Long id) {
        reportService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
