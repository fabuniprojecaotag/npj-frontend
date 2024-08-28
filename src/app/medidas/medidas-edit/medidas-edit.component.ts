import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'src/app/core/services/forms.service';
import { MedidasService } from '../service/medidas.service';
import { Medida } from 'src/app/core/types/medida';
import { FormGroup } from '@angular/forms';
import { PendingChanges } from 'src/app/core/types/pending-changes';
import { debounceTime } from 'rxjs';
import { Payload } from 'src/app/core/types/payload';

@Component({
  selector: 'app-medidas-edit',
  templateUrl: './medidas-edit.component.html',
  styleUrls: ['./medidas-edit.component.scss']
})
export class MedidasEditComponent implements OnInit, PendingChanges {
  tituloPagina = 'Editar Medida Jurídica';
  medida!: Medida;
  form!: FormGroup<any> | null;
  id!: string;

  constructor(
    private formService: FormsService,
    private medidasService: MedidasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.medidasService
      .consultarMedida(this.id)
      .subscribe((callback) => {
        this.medida = callback;
        this.carregarFormulario();
      });
  }

  carregarFormulario() {
    this.form = this.formService.getForm();
    this.form?.patchValue({
      id: this.medida.id,
      nome: this.medida.nome,
      descricao: this.medida.descricao,
      area: this.medida.area,
    });

    this.form?.markAsPristine();
  }

  editar() {
    const dadosAtualizados: any = {
      nome: this.form?.value.nome,
      descricao: this.form?.value.descricao,
      area: this.form?.value.area,
    };

    const payload: Payload = {
      body: dadosAtualizados,
      classType: null
    };

    this.medidasService
      .atualizarMedida(this.id, payload)
      .pipe(debounceTime(500))
      .subscribe({
        next: () => {
          this.form?.markAsPristine();
          this.router.navigate(['/medidas/list']);
        },
      });
  }

  salvar() {
    const dadosAtualizados: any = {
      nome: this.form?.value.nome,
      descricao: this.form?.value.descricao,
      area: this.form?.value.area,
    };

    const payload: Payload = {
      body: dadosAtualizados,
      classType: null
    };

    this.medidasService
      .atualizarMedida(this.id, payload)
      .pipe(debounceTime(500))
      .subscribe({
        next: () => {
          this.form?.markAsPristine();
          window.alert('Edição realizada com sucesso.');
        },
      });
  }

  excluir() {
    this.medidasService.excluirMedida(this.id)
      .pipe(debounceTime(500))
      .subscribe({
        next: () => {
          this.form?.markAsPristine();
          this.router.navigate(['/medidas/list']);
        },
        error: () => { },
      });
  }

  @HostListener('window:beforeunload', ['$event'])
  hasUnsavedChanges(): boolean {
    return this.form ? this.form.dirty : false;
  }
}
