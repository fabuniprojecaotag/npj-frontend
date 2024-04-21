import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class formValidations {
  static equalTo(otherField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fieldValue = control.value;
      const otherFieldValue = control.root.get(otherField)?.value;

      if (fieldValue !== otherFieldValue) {
        return { equalTo: true };
      }

      return null;
    };
  }

  static domainValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const email = control.value.toLowerCase();
      const allowedDomains = ['projecao.edu.br', 'projecao.br'];

      const domain = email.substring(email.lastIndexOf('@') + 1);
      if (!allowedDomains.includes(domain)) {
        return { invalidDomain: true };
      }

      return null;
    };
  }
}
