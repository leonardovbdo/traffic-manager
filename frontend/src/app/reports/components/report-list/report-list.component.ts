/**
 * Componente Angular para exibir uma lista de ocorrências em uma tabela.
 * Recebe uma lista de ocorrências como entrada e emite eventos para adicionar,
 * visualizar detalhes e remover ocorrências da lista.
 * Utiliza o Angular Material para exibir os dados em uma tabela responsiva,
 * permitindo ações como adicionar, detalhar e remover ocorrências.
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Report } from '../../models/report';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-report-list', // Seletor do componente utilizado no HTML
  standalone: true, // Propriedade não padrão do Angular, geralmente não necessária
  imports: [MatTableModule, MatIconModule, MatButtonModule, DatePipe], // Módulos do Angular Material utilizados pelo componente
  templateUrl: './report-list.component.html', // Caminho para o template HTML do componente
  styleUrls: ['./report-list.component.scss'] // Caminho para os estilos SCSS do componente
})
export class ReportListComponent implements OnInit {

  @Input() reports: Report[] = []; // Lista de ocorrências recebida como entrada para exibição na tabela
  @Output() add = new EventEmitter(false); // Evento emitido ao clicar para adicionar um nova ocorrência
  @Output() detail = new EventEmitter(false); // Evento emitido ao clicar para visualizar detalhes de um ocorrência
  @Output() remove = new EventEmitter(false); // Evento emitido ao clicar para remover um ocorrência da lista
  
  readonly displayedColumns: string[] = [
    'title',
    'location',
    'typeReport',
    'street',
    'dateTime',
    'latitude',
    'longitude',
    'actions'
  ]; // Colunas exibidas na tabela de ocorrências

  constructor() {}
  
  ngOnInit(): void { }

  // Método para emitir o evento de adicionar nova ocorrência
  onAdd() {
    this.add.emit(true);
  }

  // Método para emitir o evento de visualizar detalhes de um ocorrência
  onDetail(report: Report) {
    this.detail.emit(report);
  }

  // Método para emitir o evento de remover um ocorrência da lista
  onDelete(report: Report) {
    this.remove.emit(report);
  }
}
