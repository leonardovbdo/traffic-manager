package com.leonardovbdo.traffic_manager_api.controllers;

import com.leonardovbdo.traffic_manager_api.domain.Street.StreetResponseDTO;
import com.leonardovbdo.traffic_manager_api.services.StreetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/streets")
public class StreetController {
    @Autowired
    private StreetService service;

    /**
     * Endpoint para listar todas as ruas cadastradas.
     *
     * @return Lista de DTOs contendo informações das ruas
     */
    @GetMapping
    public List<StreetResponseDTO> list() {
        return this.service.list();
    }
}
