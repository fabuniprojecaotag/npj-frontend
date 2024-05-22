import { TestBed } from '@angular/core/testing';

import { FormsService } from './forms.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe(FormsService.name, () => {
  let service: FormsService;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormsService]
    });

    service = TestBed.inject(FormsService);
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the form correctly', () => {
    const form: FormGroup = formBuilder.group({
      campoDeTeste: ['']
    });
    service.setForm(form);
    expect(service.getForm()).toEqual(form);
  });

  it('should get the correct form', () => {
    const form: FormGroup = formBuilder.group({
      campoDeTeste: ['123']
    });
    service.setForm(form);
    const returnedForm = service.getForm();
    expect(returnedForm).toBeTruthy();
    expect(returnedForm?.get('campoDeTeste')).toBeTruthy();
    expect(returnedForm?.get('campoDeTeste')?.value).toEqual('123');
  });

  it('should return null if no form is set', () => {
    service.cadastroForm = null;
    expect(service.getForm()).toBeNull();
  });
});
