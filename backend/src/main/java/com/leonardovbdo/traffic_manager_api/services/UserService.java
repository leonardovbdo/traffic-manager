package com.leonardovbdo.traffic_manager_api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.leonardovbdo.traffic_manager_api.domain.User.User;
import com.leonardovbdo.traffic_manager_api.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    /**
     * Busca um usuário pelo seu e-mail.
     *
     * @param email E-mail do usuário a ser buscado
     * @return Entidade do usuário encontrada
     * @throws RuntimeException se o usuário não for encontrado
     */
    public User findByEmail(String email) {
        User user = repository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return user;
    }
}
