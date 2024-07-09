import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Componente Angular para o layout padrão de telas de login.
 * Este componente encapsula a estrutura visual e lógica comuns para telas de login,
 * permitindo personalização através de inputs e interação com a aplicação através de outputs.
 */
@Component({
  selector: 'app-default-login-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './default-login-layout.component.html',
  styleUrl: './default-login-layout.component.scss'
})
export class DefaultLoginLayoutComponent {
  @Input() title: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Input() disabledPrimaryBtn: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();

  @Output("navigate") onNavigate = new EventEmitter();
  
  submit(){
    this.onSubmit.emit();
  }

  navigate(){
    this.onNavigate.emit();
  }
}
