package com.leonardovbdo.traffic_manager_api.infra.security;

import java.io.IOException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.leonardovbdo.traffic_manager_api.domain.User.User;
import com.leonardovbdo.traffic_manager_api.repositories.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Filtro de segurança para autenticação via token JWT.
 * Intercepta requisições HTTP, verifica o token JWT presente no cabeçalho Authorization,
 * valida o token e autentica o usuário no contexto de segurança do Spring Security.
 */
@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    TokenService tokenService;

    @Autowired
    UserRepository userRepository;

    /**
     * Método que implementa a lógica de filtragem e autenticação.
     *
     * @param request     O objeto HttpServletRequest que representa a requisição HTTP.
     * @param response    O objeto HttpServletResponse que representa a resposta HTTP.
     * @param filterChain O objeto FilterChain para continuar o processamento da requisição.
     * @throws ServletException Se ocorrer um erro durante o tratamento da requisição.
     * @throws IOException      Se ocorrer um erro de I/O durante o tratamento da requisição.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request);
        var login = tokenService.validateToken(token);

        if(login != null){
            User user = userRepository.findByEmail(login).orElseThrow(() -> new RuntimeException("User Not Found"));
            var authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
            var authentication = new UsernamePasswordAuthenticationToken(user, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Método para recuperar o token JWT do cabeçalho Authorization da requisição.
     *
     * @param request O objeto HttpServletRequest que representa a requisição HTTP.
     * @return O token JWT recuperado da requisição, ou null se não estiver presente.
     */
    private String recoverToken(HttpServletRequest request){
        var authHeader = request.getHeader("Authorization");
        if(authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}
