package com.leonardovbdo.traffic_manager_api.domain.TypeOccurrence;

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
 * Representa um tipo de ocorrência no sistema de gerenciamento de tráfego.
 * A entidade TypeReport contém uma descrição do tipo de ocorrência.
 * A anotação @Entity indica que esta classe é uma entidade JPA,
 * e a tabela correspondente no banco de dados é "type_report".
 */
@Entity
@Table(name = "type_report")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TypeReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
}
