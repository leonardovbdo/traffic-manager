import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';
import { ReportPage } from '../models/report-page';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly API = 'http://localhost:8080/reports'; // URL da API que fornece ocorrências

  constructor(private httpClient: HttpClient) { }

  /**
   * Método para listar os ocorrências paginados de acordo com a página e o tamanho da página especificados.
   * @param page Número da página a ser recuperada (padrão é 0).
   * @param pageSize Número máximo de registros por página (padrão é 10).
   * @param email Email do usuário para filtrar ocorrências (opcional).
   * @returns Observable contendo um objeto `ReportPage` que contém a lista de ocorrências e informações de paginação.
   */
  list(page = 0, pageSize = 10, email: string) {
    return this.httpClient.get<ReportPage>(this.API, { params: { page: page.toString(), pageSize: pageSize.toString(), email } })
      .pipe(
        first() // Retorna apenas a primeira resposta da requisição
      );
  }

  /**
   * Método para carregar um ocorrência específico pelo seu ID.
   * @param id ID da ocorrência a ser carregado.
   * @returns Observable contendo o objeto `Report` correspondente ao ID fornecido.
   */
  loadById(id: string) {
    return this.httpClient.get<Report>(`${this.API}/${id}`);
  }

  /**
   * Método para salvar um nova ocorrência ou atualizar um existente.
   * @param record Dados da ocorrência a serem salvos. Para criar um nova ocorrência, deve omitir o campo 'id'.
   * @returns Observable contendo o objeto `Report` salvo.
   */
  save(record: Partial<Omit<Report, 'id'>>) {
    return this.create(record); // Encaminha para o método create para realizar a operação de criação/atualização
  }

  /**
   * Método privado para criar um nova ocorrência.
   * @param record Dados da ocorrência a serem criados.
   * @returns Observable contendo o objeto `Report` criado.
   */
  private create(record: Partial<Omit<Report, 'id'>>) {
    return this.httpClient.post<Report>(this.API, record).pipe(first()); // Faz uma requisição POST para criar um nova ocorrência
  }

  /**
   * Método para remover um ocorrência pelo seu ID.
   * @param id ID da ocorrência a ser removido.
   * @returns Observable contendo a resposta da requisição de remoção.
   */
  remove(id: number) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first()); // Faz uma requisição DELETE para remover um ocorrência
  }
}
