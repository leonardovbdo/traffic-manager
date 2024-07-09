import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Street } from '../../models/street';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreetService {

  private readonly API = 'http://localhost:8080/streets'; // URL da API que fornece dados das ruas

  constructor(private http: HttpClient) { }

  /**
   * Método para buscar ruas que correspondam ao termo de busca fornecido.
   * @param term Termo de busca para filtrar as ruas.
   * @returns Observable contendo um array de objetos `Street` que correspondem ao termo de busca.
   */
  searchStreets(term: string) {
    // Faz uma requisição GET para a API, passando o termo como parâmetro de busca
    return this.http.get<Street[]>(this.API, { params: { term } }).pipe(
      // Mapeia a resposta para extrair apenas os dados das ruas
      map((streets: Street[]) => streets)
    );
  }
}
