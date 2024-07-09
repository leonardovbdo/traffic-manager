import { Component, OnInit } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../component/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../component/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

interface LoginForm {
  email: FormControl,
  password: FormControl
}

/**
 * Componente Angular responsável pela página de login da aplicação.
 * Este componente integra o layout padrão de login, formulário reativo para validação de email e senha,
 * e lógica de interação com o serviço de login para autenticação de usuários.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  ngOnInit(): void {
    this.loginService.logout();
  }

  submit() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => {
        this.toastrService.success("Login efetuado com sucesso!");
        this.router.navigate(["/reports"]);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.toastrService.error("Email ou senha inválidos.");
        } else {
          this.toastrService.error("Erro inesperado! Tente novamente mais tarde.");
        }
      }
    })
  }

  navigate() {
    this.router.navigate(["/signup"])
  }
}
