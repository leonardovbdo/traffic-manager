package com.leonardovbdo.traffic_manager_api.dto;

/**
 * DTO que representa a resposta de uma requisição, contendo o e-mail do usuário e o token de autenticação.
 */
public record ResponseDTO(String email, String token) {}
