import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeReport } from '../../models/type-report';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeReportService {
  private readonly API = 'http://localhost:8080/types'; // URL da API que fornece tipos de ocorrências

  constructor(private http: HttpClient) { }

  /**
   * Método para buscar tipos de ocorrências que correspondam ao termo de busca fornecido.
   * @param term Termo de busca para filtrar os tipos de ocorrências.
   * @returns Observable contendo um array de objetos `TypeReport` que correspondem ao termo de busca.
   */
  searchTypeReports(term: string) {
    // Faz uma requisição GET para a API, passando o termo como parâmetro de busca
    return this.http.get<TypeReport[]>(this.API, { params: { term } }).pipe(
      // Mapeia a resposta para extrair apenas os dados dos tipos de ocorrências
      map((typeReports: TypeReport[]) => typeReports)
    );
  }
}
