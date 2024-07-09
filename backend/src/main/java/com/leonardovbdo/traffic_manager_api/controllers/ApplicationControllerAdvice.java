package com.leonardovbdo.traffic_manager_api.controllers;

import com.leonardovbdo.traffic_manager_api.infra.exception.ReportNotFoundException;
import com.leonardovbdo.traffic_manager_api.infra.exception.LoginException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import jakarta.validation.ConstraintViolationException;

import java.util.HashMap;
import java.util.Map;

/**
 * Classe responsável por tratar exceções lançadas pelos controllers REST da aplicação.
 */
@RestControllerAdvice
public class ApplicationControllerAdvice {

    /**
     * Trata a exceção ReportNotFoundException retornando uma resposta com status 404 (Not Found).
     *
     * @param ex Exceção ReportNotFoundException lançada
     * @return Mensagem de erro da exceção
     */
    @ExceptionHandler(ReportNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNotFoundException(ReportNotFoundException ex) {
        return ex.getMessage();
    }

    /**
     * Trata a exceção LoginException retornando uma resposta com status 403 (Forbidden).
     *
     * @param ex Exceção LoginException lançada
     * @return Mensagem de erro da exceção
     */
    @ExceptionHandler(LoginException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public String handleLoginException(LoginException ex) {
        return ex.getMessage();
    }

    /**
     * Trata a exceção ConstraintViolationException retornando uma resposta com status 400 (Bad Request).
     * Captura mensagens de violação de constraints de validação.
     *
     * @param ex Exceção ConstraintViolationException lançada
     * @return Mensagens de erro de validação concatenadas
     */
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleConstraintViolationException(ConstraintViolationException ex) {
        return ex.getConstraintViolations().stream()
                .map(error -> error.getPropertyPath() + " " + error.getMessage())
                .reduce("", (acc, error) -> acc + error + "\n");
    }

    /**
     * Trata a exceção MethodArgumentTypeMismatchException retornando uma resposta com status 400 (Bad Request).
     * Captura mensagens de erro quando o tipo do argumento do método não corresponde ao esperado.
     *
     * @param ex Exceção MethodArgumentTypeMismatchException lançada
     * @return Mensagem de erro detalhando o tipo esperado do argumento
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        if (ex != null && ex.getRequiredType() != null) {
            String type = ex.getRequiredType().getName();
            String[] typeParts = type.split("\\.");
            String typeName = typeParts[typeParts.length - 1];
            return ex.getName() + " should be of type " + typeName;
        }
        return "Argument type not valid";
    }

    /**
     * Método para tratar exceções de validação de argumentos do método.
     *
     * @param e Exceção MethodArgumentNotValidException lançada
     * @return Mapa de erros de validação com o nome do campo e a mensagem de erro
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    private Map<String, String> handleValidationExceptions(MethodArgumentNotValidException e) {

        Map<String, String> errors = new HashMap<>();

        e.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return errors;
    }
}
