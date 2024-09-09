import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { of } from 'rxjs';
import { ViacepService } from 'src/app/core/services/viacep.service';
import { FormAssistidosComponent } from './form-assistidos.component';
import { FormsService } from 'src/app/core/services/forms.service';

class MockFormsService {
  setForm() {
    return;
  }
}

const mockViacepResponse = {
  cep: '12345678',
  bairro: 'Bairro Teste',
  localidade: 'Cidade Teste',
  logradouro: 'Rua Teste',
  complemento: 'Complemento Teste',
  uf: '',
  ibge: '',
  gia: '',
  ddd: '',
  siafi: ''
};

class MockViacepService {
  consultarCep(cep: string) {
    return of({ mockViacepResponse });
  }
}

describe(FormAssistidosComponent.name, () => {
  let component: FormAssistidosComponent;
  let fixture: ComponentFixture<FormAssistidosComponent>;
  let viacepService: ViacepService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAssistidosComponent],
      imports: [
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        NgxMaskDirective, NgxMaskPipe,
      ],
      providers: [
        { provide: FormsService, useClass: MockFormsService },
        { provide: ViacepService, useClass: MockViacepService },
        provideNgxMask()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAssistidosComponent);
    component = fixture.componentInstance;
    viacepService = TestBed.inject(ViacepService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('(DOM) should mark the nome field as invalid if it is empty', () => {
    const nome = component.formAssistidos.controls['nome'];
    nome.setValue('');
    expect(nome.valid).toBeFalsy();
    expect(nome.errors?.['required']).toBeTruthy();
  });

  it('(DOM) should mark the nome field as invalid if it has less than 3 characters', () => {
    const nome = component.formAssistidos.controls['nome'];
    nome.setValue('AB');
    expect(nome.valid).toBeFalsy();
    expect(nome.errors?.['minlength']).toBeTruthy();
  });

  it('(DOM) should mark the nome field as invalid if it has more than 60 characters', () => {
    const nome = component.formAssistidos.controls['nome'];
    nome.setValue('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
    expect(nome.valid).toBeFalsy();
    expect(nome.errors?.['maxlength']).toBeTruthy();
  });

  it('(DOM) should mark the email field as invalid if it has an invalid email format', () => {
    const email = component.formAssistidos.controls['email'];
    email.setValue('email_invalido');
    expect(email.valid).toBeFalsy();
    expect(email.errors?.['email']).toBeTruthy();
  });

  it('(DOM) should mark the cpf field as invalid if it has an invalid CPF format', () => {
    const cpf = component.formAssistidos.controls['cpf'];
    cpf.setValue('12345678900');
    expect(cpf.valid).toBeFalsy();
    expect(cpf.errors?.['pattern']).toBeTruthy();
  });

  it('(DOM) should mark the rg field as invalid if it has an invalid RG format', () => {
    const cpf = component.formAssistidos.controls['rg'];
    cpf.setValue('111111111111');
    expect(cpf.valid).toBeFalsy();
    expect(cpf.errors?.['pattern']).toBeTruthy();
  });

  it('(DOM) should mark the telefone field as invalid if it is empty', () => {
    const telefone = component.formAssistidos.controls['telefone'];
    telefone.setValue('');
    expect(telefone.valid).toBeFalsy();
    expect(telefone.errors?.['required']).toBeTruthy();
  });

  it('(DOM) should mark the remuneracao field as invalid if it has an invalid monetary format', () => {
    const remuneracao = component.formAssistidos.controls['remuneracao'];
    remuneracao.setValue('12345');
    expect(remuneracao.valid).toBeFalsy();
    expect(remuneracao.errors?.['pattern']).toBeTruthy();
  });

  it('(DOM) should mark the telefone field as invalid if it has an invalid phone number format', () => {
    const telefone = component.formAssistidos.controls['telefone'];
    telefone.setValue('12345');
    expect(telefone.valid).toBeFalsy();
    expect(telefone.errors?.['pattern']).toBeTruthy();
  });

  it('(DOM) should mark the mae field as invalid if it is empty', () => {
    const maeInput = fixture.nativeElement.querySelector('input[formControlName="mae"]');
    maeInput.value = '';
    maeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.formAssistidos.get('filiacao')?.get('mae')?.invalid).toBeTruthy();
  });

  it('(DOM) should mark the cep field as invalid if it has less than 8 characters', () => {
    const component = fixture.componentInstance;
    const residentialAddress = component.formAssistidos.get('endereco')?.get('residencial');

    residentialAddress?.get('cep')?.setValue('1234567'); // - de 8 digitos = erro

    fixture.detectChanges();

    expect(residentialAddress?.get('cep')?.valid).toBeFalsy();
    expect(residentialAddress?.get('cep')?.errors?.['minlength']).toBeTruthy();
  });

  it('(DOM) should mark the cep field as invalid if it is empty', () => {
    const cep = component.formAssistidos.get('endereco')?.get('residencial')?.get('cep');
    cep?.setValue('');
    expect(cep?.valid).toBeFalsy();
    expect(cep?.errors?.['required']).toBeTruthy();
  });

  it('should emit acaoClique event when executarAcao is called', () => {
    const spy = spyOn(component.acaoClique, 'emit');
    component.executarAcao();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit cliqueExcluir event when excluir is called', () => {
    const spy = spyOn(component.cliqueExcluir, 'emit');
    component.excluir();
    expect(spy).toHaveBeenCalled();
  });

  it('should call consultarCep from ViacepService when consultarCep function is called', () => {
    const tipoEndereco = 'residencial';
    const cepValue = '12345678';
    const enderecoGroup = component.formAssistidos.get('endereco')?.get(tipoEndereco);
    enderecoGroup?.get('cep')?.setValue(cepValue);

    const spyConsultarCep = spyOn(viacepService, 'consultarCep').and.returnValue(of(mockViacepResponse));

    component.consultarCep(tipoEndereco);

    expect(spyConsultarCep).toHaveBeenCalledWith(cepValue);
  });

  it('should update form validators based on @type changes', () => {
    const dataNascimentoControl = component.formAssistidos.get('dataNascimento');
    const naturalidadeControl = component.formAssistidos.get('naturalidade');
    const dependentesControl = component.formAssistidos.get('dependentes');
    const pisControl = component.formAssistidos.get('pis');
    const ctpsNumeroControl = component.formAssistidos.get('ctps')?.get('numero');
    const ctpsSerieControl = component.formAssistidos.get('ctps')?.get('serie');
    const ctpsUFControl = component.formAssistidos.get('ctps')?.get('uf');

    // Simulate @type change to 'Civil'
    component.formAssistidos.get('@type')?.setValue('Civil');
    expect(dataNascimentoControl?.validator).toEqual(Validators.required);
    expect(naturalidadeControl?.validator).toEqual(Validators.required);
    expect(dependentesControl?.validator).toEqual(Validators.required);
    expect(pisControl?.validator).toBeNull();
    expect(ctpsNumeroControl?.validator).toBeNull();
    expect(ctpsSerieControl?.validator).toBeNull();
    expect(ctpsUFControl?.validator).toBeNull();

    // Simulate @type change to 'Trabalhista'
    component.formAssistidos.get('@type')?.setValue('Trabalhista');
    expect(pisControl?.validator).toEqual(Validators.required);
    expect(ctpsNumeroControl?.validator).toEqual(Validators.required);
    expect(ctpsSerieControl?.validator).toEqual(Validators.required);
    expect(ctpsUFControl?.validator).toEqual(Validators.required);
    expect(dataNascimentoControl?.validator).toBeNull();
    expect(naturalidadeControl?.validator).toBeNull();
    expect(dependentesControl?.validator).toBeNull();

    // Simulate @type change to 'Ambos'
    component.formAssistidos.get('@type')?.setValue('Ambos');
    expect(dataNascimentoControl?.validator).toEqual(Validators.required);
    expect(naturalidadeControl?.validator).toEqual(Validators.required);
    expect(dependentesControl?.validator).toEqual(Validators.required);
    expect(pisControl?.validator).toEqual(Validators.required);
    expect(ctpsNumeroControl?.validator).toEqual(Validators.required);
    expect(ctpsSerieControl?.validator).toEqual(Validators.required);
    expect(ctpsUFControl?.validator).toEqual(Validators.required);
  });
});
