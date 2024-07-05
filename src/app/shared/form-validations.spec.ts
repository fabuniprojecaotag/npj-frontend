import { FormGroup, FormControl } from "@angular/forms";
import { formValidations } from "./form-validations";

describe(formValidations.name, () => {
  describe(formValidations.equalTo.name, () => {
    it('should return null if values are equal', () => {
      const form = new FormGroup({
        senha: new FormControl('123456'),
        confirmarSenha: new FormControl('123456')
      });
      form.controls['confirmarSenha'].setValidators(formValidations.equalTo('senha'));

      form.controls['confirmarSenha'].updateValueAndValidity();

      expect(form.controls['confirmarSenha'].errors).toBeNull();
    });

    it('should return { equalTo: true } if values are not equal', () => {
      const form = new FormGroup({
        senha: new FormControl('123456'),
        confirmarSenha: new FormControl('654321')
      });
      form.controls['confirmarSenha'].setValidators(formValidations.equalTo('senha'));

      form.controls['confirmarSenha'].updateValueAndValidity();

      expect(form.controls['confirmarSenha'].errors).toEqual({ equalTo: true });
    });
  });

  describe(formValidations.domainValidator.name, () => {
    it('should return null for allowed domain', () => {
      const control = new FormControl('user@projecao.edu.br');
      const validator = formValidations.domainValidator();

      const result = validator(control);

      expect(result).toBeNull();
    });

    it('should return { domainValidator: true } for disallowed domain', () => {
      const control = new FormControl('user@example.com');
      const validator = formValidations.domainValidator();

      const result = validator(control);

      expect(result).toEqual({ domainValidator: true });
    });

    it('should return null for empty control value', () => {
      const control = new FormControl('');
      const validator = formValidations.domainValidator();

      const result = validator(control);

      expect(result).toBeNull();
    });
  });
})
