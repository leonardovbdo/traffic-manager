package com.leonardovbdo.traffic_manager_api.domain.User;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Representa um usuário no sistema de gerenciamento de tráfego.
 * A entidade User contém informações básicas sobre o usuário, como
 * nome, email e senha. A anotação @Entity indica que esta classe é uma
 * entidade JPA, e a tabela correspondente no banco de dados é "users".
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;
    private String password;
}
