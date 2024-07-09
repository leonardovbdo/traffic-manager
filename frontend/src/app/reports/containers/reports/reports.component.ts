import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportListComponent } from '../../components/report-list/report-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, Observable, of, tap } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AsyncPipe } from '@angular/common';
import { ErrorDialogComponent } from '../../../shared/components/dialogs/error-dialog/error-dialog.component';
import { ReportService } from '../../services/report.service';
import { ReportPage } from '../../models/report-page';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Report } from '../../models/report';
import { ConfirmationDialogComponent } from '../../../shared/components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { LoginService } from '../../../auth/services/login.service';
import { MatButtonModule } from '@angular/material/button';

/**
 * Componente principal para a página de ocorrências.
 * Responsável por gerenciar a listagem, adição, visualização detalhada e remoção de ocorrências.
 * Utiliza Angular Material para paginação, exibição de diálogos de erro e confirmação,
 * e apresentação de uma lista de ocorrências através do componente ReportListComponent.
 */
@Component({
  selector: 'app-reports', // Seletor do componente utilizado no HTML
  standalone: true, // Propriedade não padrão do Angular, geralmente não necessária
  imports: [ // Módulos do Angular Material utilizados pelo componente
    ReportListComponent,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    AsyncPipe
  ],
  templateUrl: './reports.component.html', // Caminho para o template HTML do componente
  styleUrl: './reports.component.scss' // Caminho para os estilos SCSS do componente
})
export class ReportsComponent implements OnInit {

  reports$: Observable<ReportPage> | null = null; // Observable para armazenar a lista de ocorrências

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Referência ao paginator da tabela de ocorrências

  pageIndex = 0; // Índice da página atual
  pageSize = 10; // Quantidade de itens por página

  constructor(
    private reportService: ReportService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {
    this.refresh(); // Inicializa a página de ocorrências ao criar o componente
  }

  // Atualiza a lista de ocorrências com base na páginação e no email do usuário logado
  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }) {
    const email = sessionStorage.getItem('username');

    if (email !== null) {
      this.reports$ = this.reportService.list(pageEvent.pageIndex, pageEvent.pageSize, email)
        .pipe(
          tap(() => {
            this.pageIndex = pageEvent.pageIndex;
            this.pageSize = pageEvent.pageSize;
          }),
          catchError(error => {
            this.onError('Erro ao carregar ocorrências.');
            return of({ reports: [], totalElements: 0, totalPages: 0 });
          })
        );
    } else {
      this.onError('Email não encontrado no sessionStorage.');
    }
  }

  // Exibe um diálogo de erro com a mensagem fornecida
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {} // Método inicializador do Angular, não contém implementação específica neste componente

  // Navega para a página de adicionar nova ocorrência
  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  // Navega para a página de detalhes de um ocorrência específico
  onDetail(report: Report) {
    this.router.navigate(['detail', report.id], { relativeTo: this.route });
  }

  // Inicia o processo de remoção de um ocorrência, exibindo um diálogo de confirmação
  onRemove(report: Report) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse ocorrência?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result && report.id) {
        this.reportService.remove(report.id).subscribe(
          () => {
            this.refresh(); // Atualiza a lista de ocorrências após a remoção bem-sucedida
            this.snackBar.open('ocorrência removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          () => this.onError('Erro ao tentar remover ocorrência.') // Exibe um erro em caso de falha na remoção
        );
      }
    });
  }

  // Realiza o logout do usuário e navega para a página de login
  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }
}
