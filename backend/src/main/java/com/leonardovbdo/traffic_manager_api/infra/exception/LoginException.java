package com.leonardovbdo.traffic_manager_api.infra.exception;

/**
 * Exceção lançada quando ocorre um erro de login devido a e-mail ou senha incorretos.
 */
public class LoginException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    /**
     * Construtor padrão que define a mensagem de erro padrão para e-mail ou senha incorretos.
     */
    public LoginException() {
        super("E-mail ou senha incorretos.");
    }
}
