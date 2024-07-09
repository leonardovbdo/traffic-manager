package com.leonardovbdo.traffic_manager_api.infra.exception;

/**
 * Exceção lançada quando um registro de ocorrência não é encontrado com o ID especificado.
 */
public class ReportNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    /**
     * Construtor que recebe o ID da ocorrência não encontrado e define a mensagem de erro correspondente.
     *
     * @param id O ID da ocorrência não encontrado.
     */
    public ReportNotFoundException(Long id) {
        super("Registro não encontrado com o id: " + id);
    }
}
