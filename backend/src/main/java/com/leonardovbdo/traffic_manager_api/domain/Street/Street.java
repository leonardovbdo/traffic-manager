package com.leonardovbdo.traffic_manager_api.domain.Street;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Representa uma rua no sistema de gerenciamento de tráfego.
 * A entidade Street contém informações básicas sobre a rua, como
 * o nome. A anotação @Entity indica que esta classe é uma entidade JPA,
 * e a tabela correspondente no banco de dados é "streets".
 */
@Entity
@Table(name = "streets")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Street {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
}
