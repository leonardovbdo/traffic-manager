import { Report } from "./report";

/**
 * Interface que representa uma lista paginada de ocorrências.
 * Contém um array de ocorrências (`reports`), o número total de elementos (`totalElements`),
 * e o número total de páginas (`totalPages`).
 */
export interface ReportPage {
    reports: Report[];
    totalElements: number;
    totalPages: number;
}
