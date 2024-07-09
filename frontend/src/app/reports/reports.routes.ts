import { Routes } from '@angular/router';
import { ReportsComponent } from './containers/reports/reports.component';
import { ReportResolver } from './guards/report.resolver';
import { ReportFormComponent } from './containers/report-form/report-form.component';
/**
 * Definição das rotas relacionadas aos ocorrências.
 * Inclui rota para listagem, criação e visualização detalhada de ocorrências,
 * utilizando ReportsComponent para listagem e ReportFormComponent para criação e detalhes.
 * Utiliza ReportResolver para carregar dados da ocorrência antes de exibir o formulário.
 */
export const REPORTS_ROUTES: Routes = [
  { path: '', component: ReportsComponent },
  { path: 'new', component: ReportFormComponent, data: { isViewMode: false }, resolve: { report: ReportResolver } },
  { path: 'detail/:id', component: ReportFormComponent, data: { isViewMode: true }, resolve: { report: ReportResolver } }
];
