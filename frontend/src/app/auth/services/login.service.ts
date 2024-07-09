/**
 * Serviço Angular para operações de autenticação de usuário, como login, cadastro e logout.
 * Este serviço utiliza HttpClient para realizar requisições HTTP para o backend de autenticação.
 * Gerencia o armazenamento de tokens de autenticação e informações do usuário na sessionStorage.
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl: string = "http://localhost:8080/auth"; // URL base da API de autenticação

  constructor(private httpClient: HttpClient) {}

  /**
   * Método para realizar login do usuário.
   * @param email Email do usuário
   * @param password Senha do usuário
   * @returns Observable com resposta de login contendo token de autenticação e email do usuário
   */
  login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, {email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token); // Armazena token de autenticação na sessionStorage
        sessionStorage.setItem("username", value.email); // Armazena email do usuário na sessionStorage
      })
    );
  }

  /**
   * Método para realizar cadastro de um novo usuário.
   * @param name Nome do novo usuário
   * @param email Email do novo usuário
   * @param password Senha do novo usuário
   * @returns Observable com resposta de cadastro contendo token de autenticação e email do usuário
   */
  signup(name: string, email: string, password: string) {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/register`, {name, email, password}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token); // Armazena token de autenticação na sessionStorage
        sessionStorage.setItem("username", value.email); // Armazena email do usuário na sessionStorage
      })
    );
  }

  /**
   * Método para realizar logout do usuário.
   * Remove o token de autenticação e email do usuário da sessionStorage.
   */
  logout() {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("username");
  }
}
