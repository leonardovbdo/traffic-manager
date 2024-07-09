/**
 * Guarda de rota Angular para proteger rotas que requerem autenticação.
 * Verifica a existência de um token de autenticação na sessionStorage.
 * Redireciona para a página de login caso não haja token válido.
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = sessionStorage.getItem('auth-token'); // Obtém o token de autenticação da sessionStorage

    if (authToken) {
      return true; // Permite acesso à rota se houver um token válido
    } else {
      this.router.navigate(['/login']); // Redireciona para a página de login se não houver token válido
      return false; // Não permite acesso à rota atual
    }
  }
}
