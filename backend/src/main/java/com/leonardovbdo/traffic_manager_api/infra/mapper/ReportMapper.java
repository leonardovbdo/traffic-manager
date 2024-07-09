package com.leonardovbdo.traffic_manager_api.infra.mapper;

import com.leonardovbdo.traffic_manager_api.domain.Report.Report;
import com.leonardovbdo.traffic_manager_api.domain.Report.ReportRequestDTO;
import com.leonardovbdo.traffic_manager_api.domain.Report.ReportResponseDTO;
import com.leonardovbdo.traffic_manager_api.domain.Street.StreetResponseDTO;
import com.leonardovbdo.traffic_manager_api.domain.TypeOccurrence.TypeReportResponseDTO;
import com.leonardovbdo.traffic_manager_api.domain.User.UserDTO;
import com.leonardovbdo.traffic_manager_api.services.StreetService;
import com.leonardovbdo.traffic_manager_api.services.TypeReportService;
import com.leonardovbdo.traffic_manager_api.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * Componente responsável por realizar a conversão entre entidades e DTOs relacionados aas ocorrências.
 * Utiliza serviços para buscar informações adicionais necessárias durante a conversão.
 */
@RequiredArgsConstructor
@Component
public class ReportMapper {

    private final TypeReportService typeReportService;
    private final UserService userService;
    private final StreetService streetService;

    /**
     * Converte um objeto Report para ReportResponseDTO.
     *
     * @param report O objeto Report a ser convertido.
     * @return O DTO ReportResponseDTO correspondente.
     */
    public ReportResponseDTO toDTO(Report report) {
        if (report == null) {
            return null;
        }

        TypeReportResponseDTO typeReportResponseDTO = new TypeReportResponseDTO(report.getTypeReport().getId(), report.getTypeReport().getDescription());
        UserDTO userDTO = new UserDTO(report.getUser().getId(), report.getUser().getName(), report.getUser().getEmail());

        StreetResponseDTO streetResponseDTO = null;
        if (report.getStreet() != null) {
            streetResponseDTO = new StreetResponseDTO(report.getStreet().getId(), report.getStreet().getName());
        }

        return new ReportResponseDTO(
                report.getId(),
                report.getTitle(),
                report.getDescription(),
                report.getLocation(),
                typeReportResponseDTO,
                report.getDateTime(),
                userDTO,
                streetResponseDTO,
                report.getLatitude(),
                report.getLongitude()
        );
    }

    /**
     * Converte um objeto ReportRequestDTO para um objeto Report.
     *
     * @param reportDTO O DTO ReportRequestDTO a ser convertido.
     * @return O objeto Report correspondente.
     */
    public Report toEntity(ReportRequestDTO reportDTO) {

        if (reportDTO == null) {
            return null;
        }

        Report report = new Report();

        report.setTitle(reportDTO.title());
        report.setDescription(reportDTO.description());
        report.setLocation(reportDTO.location());
        report.setTypeReport(typeReportService.findById(reportDTO.typeReport()));
        report.setDateTime(reportDTO.dateTime());
        report.setUser(userService.findByEmail(reportDTO.userEmail()));
        if (reportDTO.street() != null) {
            report.setStreet(streetService.findById(reportDTO.street()));
        }
        report.setLatitude(reportDTO.latitude());
        report.setLongitude(reportDTO.longitude());

        return report;
    }
}
