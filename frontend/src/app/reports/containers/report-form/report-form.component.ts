import { Component, OnInit, TypeProvider } from '@angular/core';
import { Report } from '../../models/report';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncPipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormUtilsService } from '../../../shared/form/form-utils.service';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {TextFieldModule} from '@angular/cdk/text-field';
import { Street } from '../../models/street';
import { map, Observable, of, startWith, switchMap } from 'rxjs';
import { StreetService } from '../../services/street/street.service';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { TypeReport } from '../../models/type-report';
import { TypeReportService } from '../../services/type-report/type-report.service';

/**
 * Componente Angular para formulário de criação/edição de ocorrências.
 * Gerencia um formulário reativo que permite ao usuário inserir e editar informações detalhadas de um ocorrência,
 * como título, descrição, tipo de ocorrência, rua, data e coordenadas geográficas.
 * Utiliza serviços para obter e filtrar ruas e tipos de ocorrências através de campos de autocompletar.
 * Fornece funcionalidades para salvar, cancelar e validar o formulário, além de atualizar automaticamente a localização com base nas coordenadas.
 */
@Component({
  selector: 'app-report-form', // Seletor do componente utilizado no HTML
  standalone: true, // Propriedade não padrão do Angular, geralmente não necessária
  imports: [
    MatDatepickerModule,
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule, // Módulo para formulários reativos do Angular
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    TextFieldModule,
    MatAutocompleteModule,
    AsyncPipe
  ],
  providers: [
    provideNativeDateAdapter() // Provedor do adaptador de data nativo do Angular Material
  ],
  templateUrl: './report-form.component.html', // Caminho para o template HTML do componente
  styleUrls: ['./report-form.component.scss'] // Caminho para os estilos SCSS do componente
})
export class ReportFormComponent implements OnInit {

  form!: FormGroup; // Formulário reativo para entrada de dados da ocorrência
  isEditMode: boolean = true; // Indica se o formulário está em modo de edição ou não

  streetNameControl = new FormControl(); // Controle para o campo de rua no formulário
  filteredStreets: Observable<Street[]> | undefined; // Lista de ruas filtradas para o campo de autocompletar

  typeReportNameControl = new FormControl(); // Controle para o campo de tipo de ocorrência no formulário
  filteredTypeReports: Observable<TypeReport[]> | undefined; // Lista de tipos de ocorrências filtrados para o campo de autocompletar

  constructor(
    private formBuilder: NonNullableFormBuilder, // Construtor de formulários reativos do Angular
    private service: ReportService, // Serviço para operações relacionadas a ocorrências
    private snackBar: MatSnackBar, // Componente para exibir mensagens de notificação
    private location: Location, // Serviço do Angular para manipular a localização do navegador
    private route: ActivatedRoute, // Serviço para acessar informações sobre a rota ativa
    public formUtils: FormUtilsService, // Serviço utilitário para formulários compartilhados

    private streetService: StreetService, // Serviço para obter informações de ruas
    private typeReportService: TypeReportService, // Serviço para obter informações de tipos de ocorrências
  ) { }

  ngOnInit(): void {
    const userEmail = sessionStorage.getItem('username'); // Obtém o email do usuário da sessionStorage
    const report: Report = this.route.snapshot.data['report']; // Obtém dados da ocorrência da rota ativa

    this.isEditMode = !this.route.snapshot.data['isViewMode']; // Define se o formulário está no modo de edição

    // Inicialização do formulário com valores e validações
    this.form = this.formBuilder.group({
      id: [report.id], // ID da ocorrência
      title: [{ value: report.title, disabled: !this.isEditMode }, [ // Título da ocorrência
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]],
      description: [{ value: report.description, disabled: !this.isEditMode }, [ // Descrição da ocorrência
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(255)
      ]],
      location: [{ value: report.location, disabled: true }, [ // Localização da ocorrência (geralmente desativado para edição)
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]],
      typeReport: [{ value: report.typeReport, disabled: !this.isEditMode }, [Validators.required]], // Tipo de ocorrência
      street: [{ value: report.street, disabled: !this.isEditMode },], // Rua da ocorrência
      dateTime: [{ value: report.dateTime, disabled: !this.isEditMode }, [Validators.required]], // Data e hora da ocorrência
      latitude: [{ value: report.latitude, disabled: !this.isEditMode }, [ // Latitude da ocorrência
        Validators.required,
        Validators.maxLength(10)
      ]],
      longitude: [{ value: report.longitude, disabled: !this.isEditMode }, [ // Longitude da ocorrência
        Validators.required,
        Validators.maxLength(10)
      ]],
      userEmail: [userEmail] // Email do usuário dono da ocorrência
    });

    // Observadores para filtragem dinâmica de ruas e tipos de ocorrências
    this.filteredStreets = this.form.get('street')!.valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filterStreets(value || ''))
    );

    this.filteredTypeReports = this.form.get('typeReport')!.valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filterTypeReports(value || ''))
    );

    // Define os valores iniciais dos campos de tipo de ocorrência e rua
    this.typeReportNameControl.setValue(report.typeReport?.description);
    this.streetNameControl.setValue(report.street?.name);

    // Desabilita campos de tipo de ocorrência e rua se não estiver em modo de edição
    if (!this.isEditMode) {
      this.typeReportNameControl.disable();
      this.streetNameControl.disable();
    }

    // Observadores para atualização automática da localização baseada nas coordenadas
    this.form.get('latitude')?.valueChanges.subscribe(() => this.updateLocation());
    this.form.get('longitude')?.valueChanges.subscribe(() => this.updateLocation());
    this.streetNameControl.valueChanges.subscribe((value) => {
      this.updateLocation();
      if (!value) {
        this.form.get('street')!.setValue(null);
      }
    });

    // Inicializa a localização com base nas coordenadas iniciais
    this.updateLocation();
  }

  // Método para submeter o formulário
  onSubmit() {
    if (this.form.valid) {
      this.form.get('location')?.enable(); // Habilita o campo de localização antes de salvar
      this.service.save(this.form.value) // Salva os dados da ocorrência através do serviço
        .subscribe(result => this.onSuccess(), error => this.onError());
    } else {
      this.formUtils.validateAllFormFields(this.form); // Valida todos os campos do formulário se não estiverem válidos
    }
  }

  // Método para cancelar e retornar à página anterior
  onCancel() {
    this.location.back();
  }

  // Método privado para lidar com sucesso ao salvar a ocorrência
  private onSuccess() {
    this.snackBar.open('ocorrência salvo com sucesso!', '', { duration: 5000 }); // Exibe mensagem de sucesso
    this.onCancel(); // Retorna à página anterior após o sucesso
  }

  // Método privado para lidar com erro ao salvar a ocorrência
  private onError() {
    this.snackBar.open('Erro ao salvar ocorrência.', '', { duration: 5000 }); // Exibe mensagem de erro
  }

  // Método privado para filtrar ruas baseado no valor digitado
  private _filterStreets(value: string): Observable<Street[]> {
    return this.streetService.searchStreets(value); // Utiliza o serviço para buscar e filtrar ruas
  }

  // Método para lidar com seleção de rua no campo de autocompletar
  onStreetSelected(event: MatAutocompleteSelectedEvent) {
    const street: Street = event.option.value; // Obtém a rua selecionada do evento
    this.form.get('street')!.setValue(street.id); // Define o valor do campo de rua no formulário
    this.streetNameControl.setValue(street.name); // Define o nome da rua no controle de autocompletar
  }

  // Método privado para filtrar tipos de ocorrências baseado no valor digitado
  private _filterTypeReports(value: string): Observable<TypeReport[]> {
    return this.typeReportService.searchTypeReports(value); // Utiliza o serviço para buscar e filtrar tipos de ocorrências
  }

  // Método para lidar com seleção de tipo de ocorrência no campo de autocompletar
  onTypeReportSelected(event: MatAutocompleteSelectedEvent) {
    const typeReport: TypeReport = event.option.value; // Obtém o tipo de ocorrência selecionado do evento
    this.form.get('typeReport')!.setValue(typeReport.id); // Define o valor do campo de tipo de ocorrência no formulário
    this.typeReportNameControl.setValue(typeReport.description); // Define a descrição do tipo de ocorrência no controle de autocompletar
  }

  // Método para atualizar a localização com base nas coordenadas fornecidas
  updateLocation() {
    const latitude = this.form.get('latitude')?.value; // Obtém a latitude do formulário
    const longitude = this.form.get('longitude')?.value; // Obtém a longitude do formulário
    const street = this.streetNameControl.value; // Obtém o nome da rua do controle de autocompletar

    // Constrói a string de localização com base nas coordenadas e nome da rua
    const location = `Lat: ${latitude}, Long: ${longitude}, Rua: ${street || null}`;
    this.form.get('location')?.setValue(location); // Define o valor do campo de localização no formulário
  }
}
