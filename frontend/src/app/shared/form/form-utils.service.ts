import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

/**
 * Serviço utilitário para formulários que oferece funcionalidades para validar todos os campos de um FormGroup ou FormArray,
 * obter mensagens de erro de validação e verificar se um FormArray é requerido.
 */
@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  /**
   * Marca todos os campos de um FormGroup ou FormArray como tocados (touched), aplicando validação apenas para si mesmo.
   * @param formGroup FormGroup ou FormArray a ser validado.
   */
  validateAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormFields(control);
      }
    });
  }

  /**
   * Obtém a mensagem de erro associada a um campo específico de um FormGroup.
   * @param formGroup FormGroup que contém o campo.
   * @param fieldName Nome do campo no FormGroup.
   * @returns A mensagem de erro correspondente ao campo especificado.
   */
  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  /**
   * Obtém a mensagem de erro associada a um campo de formulário.
   * @param field Campo de formulário do tipo UntypedFormControl.
   * @returns A mensagem de erro correspondente ao campo de formulário.
   */
  getErrorMessageFromField(field: UntypedFormControl) {
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }

    return 'Campo Inválido';
  }

  /**
   * Obtém a mensagem de erro associada a um campo específico de um FormArray dentro de um FormGroup.
   * @param formGroup FormGroup que contém o FormArray.
   * @param formArrayName Nome do FormArray dentro do FormGroup.
   * @param fieldName Nome do campo dentro do FormArray.
   * @param index Índice do elemento dentro do FormArray.
   * @returns A mensagem de erro correspondente ao campo especificado dentro do FormArray.
   */
  getFormArrayFieldErrorMessage(formGroup: UntypedFormGroup, formArrayName: string,
    fieldName: string, index: number) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  /**
   * Verifica se um FormArray dentro de um FormGroup é requerido.
   * @param formGroup FormGroup que contém o FormArray.
   * @param formArrayName Nome do FormArray dentro do FormGroup.
   * @returns Verdadeiro se o FormArray é requerido e inválido, falso caso contrário.
   */
  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return !formArray.valid && formArray.hasError('required') && formArray.touched;
  }
}
