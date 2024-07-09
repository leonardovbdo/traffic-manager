package com.leonardovbdo.traffic_manager_api.controllers;

import com.leonardovbdo.traffic_manager_api.dto.LoginRequestDTO;
import com.leonardovbdo.traffic_manager_api.dto.RegisterRequestDTO;
import com.leonardovbdo.traffic_manager_api.dto.ResponseDTO;
import com.leonardovbdo.traffic_manager_api.domain.User.User;
import com.leonardovbdo.traffic_manager_api.infra.exception.LoginException;
import com.leonardovbdo.traffic_manager_api.infra.security.TokenService;
import com.leonardovbdo.traffic_manager_api.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

/**
 * Controlador REST responsável por endpoints relacionados à autenticação e registro de usuários.
 */
@Validated
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    /**
     * Endpoint para autenticar um usuário e gerar um token de acesso.
     *
     * @param body DTO contendo o e-mail e senha do usuário.
     * @return ResponseEntity com o e-mail do usuário e o token de autenticação se a autenticação for bem-sucedida;
     *         caso contrário, retorna uma resposta com status 403 (Forbidden).
     */
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body){
        User user = this.repository.findByEmail(body.email()).orElseThrow(LoginException::new);
        if(passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.generateToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getEmail(), token));
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    /**
     * Endpoint para registrar um novo usuário.
     *
     * @param body DTO contendo o nome, e-mail e senha do novo usuário.
     * @return ResponseEntity com o e-mail do novo usuário e o token de autenticação se o registro for bem-sucedido;
     *         caso contrário, retorna uma resposta com status 400 (Bad Request).
     */
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body){
        Optional<User> user = this.repository.findByEmail(body.email());

        if(user.isEmpty()) {
            User newUser = new User();
            newUser.setPassword(passwordEncoder.encode(body.password()));
            newUser.setEmail(body.email());
            newUser.setName(body.name());
            this.repository.save(newUser);

            String token = this.tokenService.generateToken(newUser);
            return ResponseEntity.ok(new ResponseDTO(newUser.getEmail(), token));
        }
        return ResponseEntity.badRequest().build();
    }
}
