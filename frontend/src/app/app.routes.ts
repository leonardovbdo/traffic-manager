import { Routes } from '@angular/router';
import { ReportsComponent } from './reports/containers/reports/reports.component';
import { LoginComponent } from './auth/containers/login/login.component';
import { SignupComponent } from './auth/containers/signup/signup.component';
import { AuthGuard } from './auth/services/auth-guard.service';

/**
 * Redireciona o caminho vazio para "/login" quando a URL é exatamente igual a ""
 * Define a rota para o componente LoginComponent quando a URL é "/login"
 * Define a rota para o componente SignupComponent quando a URL é "/signup"
 */
export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: 'full' },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    {
        path: 'reports',
        loadChildren: () => import('./reports/reports.routes').then(m => m.REPORTS_ROUTES), // Carrega de forma lazy o módulo de ocorrências usando loadChildren
        canActivate: [AuthGuard] // Protege a rota de ocorrências com o AuthGuard
    }
];
