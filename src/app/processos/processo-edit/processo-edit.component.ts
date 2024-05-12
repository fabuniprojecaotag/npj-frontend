import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'src/app/core/services/forms.service';
import { Processo } from 'src/app/core/types/processo';
import { ProcessosService } from 'src/app/processos/services/processos.service';
import { ModalExcluirProcessoComponent } from 'src/app/shared/modal-excluir-processo/modal-excluir-processo.component';
import { ModalProcessoComponent } from 'src/app/shared/modal-processo/modal-processo-criado.component';

@Component({
  selector: 'app-processo-edit',
  templateUrl: './processo-edit.component.html',
  styleUrls: ['./processo-edit.component.scss'],
})
export class ProcessoEditComponent implements OnInit {
  tituloPagina = 'Editar Processo';
  numeroParam!: string;
  processo!: Processo;
  form!: FormGroup<any> | null;

  constructor(
    private processsoService: ProcessosService,
    private formService: FormsService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.numeroParam = this.route.snapshot.paramMap.get('numero') as string;
    this.processsoService
      .consultarProcesso(this.numeroParam)
      .subscribe((callback) => {
        this.processo = callback;

        this.carregarFormulario();
      });
  }

  carregarFormulario() {
    this.form = this.formService.getForm();
    this.form?.patchValue({
      atendimentoId: this.processo.atendimentoId,
      numero: this.processo.numero,
      nome: this.processo.nome,
      dataDistribuicao: new Date(this.processo.dataDistribuicao),
      vara: this.processo.vara,
      forum: this.processo.forum,
      status: this.processo.status,
    });
  }

  editarProcesso() {
    const dadosAtualizados: Processo = {
      //numero :this.form?.value.numero, não enviar CPF, pois ocorrera conflito entre documentId e CPF
      nome: this.form?.value.nome,
      dataDistribuicao: this.form?.value.dataDistribuicao,
      vara: this.form?.value.vara,
      forum: this.form?.value.forum,
      atendimentoId: this.form?.value.atendimentoId,
      status: this.form?.value.status
    };
    this.processsoService
      .editarProcesso(this.numeroParam, dadosAtualizados)
      .subscribe({
        next: () => {
          this.router.navigate(['/processos/list']);
          this.abrirModal(dadosAtualizados);
        },
        error: (err) => { },
      });
  }

  excluirProcesso(idProcesso: string) {
    this.processsoService.excluirProcesso(idProcesso).subscribe({
      next: () => {
        this.router.navigate(['/processos/list']);
      },
      error: () => { },
    });
  }

  abrirModal(processo: Processo) {
    this.dialog.open(ModalProcessoComponent, {
      width: '552px',
      height: '360px',
      data: {
        operacao: 'editado',
        numero: this.processo.numero,
        nome: processo.nome,
        atendimentoId: processo.atendimentoId,
      },
    });
  }

  abrirModalExcluir() {
    this.dialog.open(ModalExcluirProcessoComponent, {
      width: '372px',
      height: '228px',
      data: {
        numero: this.processo.numero,
        deletar: () => this.excluirProcesso(this.numeroParam),
      },
    });
  }
}
