import { TypeReport } from "./type-report";
import { Street } from "./street";

/**
 * Interface que define a estrutura de um ocorrência.
 * Contém propriedades como ID (`id`), título (`title`), descrição (`description`),
 * localização (`location`), tipo de ocorrência (`typeReport`), rua (`street`),
 * data e hora (`dateTime`), email do usuário (`userEmail`), latitude (`latitude`),
 * e longitude (`longitude`).
 */
export interface Report {
    id: number | null,
    title: string | null,
    description: string | null,
    location: string | null,
    typeReport: TypeReport | null,
    street: Street | null,
    dateTime: Date | null,
    userEmail: string | null,
    latitude: string | null,
    longitude: string | null
}
