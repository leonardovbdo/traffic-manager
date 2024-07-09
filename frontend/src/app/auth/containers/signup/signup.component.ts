import { Component, OnInit } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../component/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../component/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl,
}

/**
 * Componente Angular responsável pela página de cadastro (signup) da aplicação.
 * Este componente integra o layout padrão de cadastro, formulário reativo para entrada de nome, email,
 * senha e confirmação de senha, e lógica de interação com o serviço de login para registrar novos usuários.
 */
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }
  ngOnInit(): void {
    this.loginService.logout();
  }

  submit() {
    this.loginService.signup(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password).subscribe({
      next: () => {
        this.toastrService.success("Cadastro efetuado com sucesso!"),
        this.router.navigate(["/reports"])
      },
      error: () => this.toastrService.error("Error inesperado! Tente novamente mais tarde"),
    })
  }

  navigate() {
    this.router.navigate(["/login"])
  }
}
