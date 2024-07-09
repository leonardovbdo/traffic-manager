package com.leonardovbdo.traffic_manager_api.domain.Report;

import java.time.LocalDateTime;

import com.leonardovbdo.traffic_manager_api.domain.Street.Street;
import com.leonardovbdo.traffic_manager_api.domain.TypeOccurrence.TypeReport;
import com.leonardovbdo.traffic_manager_api.domain.User.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Representa uma ocorrência no sistema de gerenciamento de tráfego.
 * A entidade Report contém informações detalhadas sobre a ocorrência, incluindo
 * título, descrição, localização, tipo de ocorrência, data e hora, usuário, rua,
 * latitude e longitude. A anotação @Entity indica que esta classe é uma entidade JPA,
 * e a tabela correspondente no banco de dados é "reports".
 *
 * Relacionamentos:
 *
 * - typeReport: Relacionamento Many-to-One com a entidade TypeReport. uma ocorrência está associado a um tipo de ocorrência,
 *   mas um tipo de ocorrência pode estar associado a várias ocorrências.
 * - user: Relacionamento Many-to-One com a entidade User. uma ocorrência é registrado por um usuário específico,
 *   mas um usuário pode registrar várias ocorrências.
 * - street: Relacionamento Many-to-One com a entidade Street. uma ocorrência pode estar associado a uma rua específica,
 *   mas uma rua pode ter várias ocorrências associados. Este campo é opcional, pois algumas ocorrências podem não estar
 *   relacionadas a uma rua específica.
 */
@Entity
@Table(name = "reports")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String location;

    @ManyToOne
    @JoinColumn(name = "type_report_id", nullable = false)
    private TypeReport typeReport;

    @Column(columnDefinition = "TIMESTAMP", nullable = false)
    private LocalDateTime dateTime;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "street_id")
    private Street street;

    @Column(nullable = false)
    private String latitude;

    @Column(nullable = false)
    private String longitude;
}
