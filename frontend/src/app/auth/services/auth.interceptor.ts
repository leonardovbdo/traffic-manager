/**
 * Interceptor HTTP para adicionar token de autenticação JWT aos cabeçalhos das requisições.
 * Obtém o token da sessionStorage e adiciona o cabeçalho Authorization com o token no formato 'Bearer <token>'.
 */
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = 'auth-token'; // Nome da chave para o token na sessionStorage

  const token = sessionStorage.getItem(authToken); // Obtém o token de autenticação da sessionStorage

  // Clona a requisição original e adiciona o cabeçalho Authorization com o token JWT
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}` // Formato 'Bearer <token>'
    }
  });

  return next(authReq); // Prossegue para a próxima etapa do pipeline de requisição
};
