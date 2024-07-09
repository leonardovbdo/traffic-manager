package com.leonardovbdo.traffic_manager_api.controllers;

import com.leonardovbdo.traffic_manager_api.domain.Street.StreetResponseDTO;
import com.leonardovbdo.traffic_manager_api.domain.TypeOccurrence.TypeReportResponseDTO;
import com.leonardovbdo.traffic_manager_api.services.StreetService;
import com.leonardovbdo.traffic_manager_api.services.TypeReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/types")
public class TypeReportController {
    @Autowired
    private TypeReportService service;

    /**
     * Endpoint para listar todos od tipos de ocorrência cadastrados.
     *
     * @return Lista de DTOs contendo informações dos tipos de ocorrência
     */
    @GetMapping
    public List<TypeReportResponseDTO> list() {
        return this.service.list();
    }
}
