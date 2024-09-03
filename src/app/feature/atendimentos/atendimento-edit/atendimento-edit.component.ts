import { Atendimento } from 'src/app/core/types/atendimento';
import { FormsService } from './../../../core/services/forms.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentosService } from 'src/app/feature/atendimentos/services/atendimentos.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalExcluidoComponent } from 'src/app/shared/modal-excluido/modal-excluido.component';
import { ModalAtendimentoComponent } from 'src/app/shared/modal-atendimento/modal-atendimento.component';
import { PendingChanges } from 'src/app/core/types/pending-changes';
import { Payload } from 'src/app/core/types/payload';

@Component({
  selector: 'app-atendimento-edit',
  templateUrl: './atendimento-edit.component.html',
  styleUrls: ['./atendimento-edit.component.scss']
})
export class AtendimentoEditComponent implements OnInit, PendingChanges {
  tituloPagina = 'Editar - ';
  tipoFicha!: string;
  id!: string;
  atendimento!: Atendimento;
  form!: FormGroup | null;

  constructor(
    private formService: FormsService,
    private atendimentoService: AtendimentosService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.tipoFicha = this.route.snapshot.paramMap.get('ficha') as string;
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.tituloPagina += this.id;

    this.atendimentoService.consultaAtendimento(this.id).subscribe({
      next: (atendimento) => {
        this.atendimento = atendimento;
        this.carregarFormulario();
        setTimeout(() => {
          this.form?.markAsPristine();
        });
      }
    });
  }

  carregarFormulario() {
    this.form = this.formService.getForm();
    this.form?.patchValue({
      id:this.id,
      status: this.atendimento.status,
      area: this.atendimento.area,
      instante: this.atendimento.instante,
      ficha: this.atendimento.ficha,
      historico: this.atendimento.historico,
      prazoEntregaDocumentos: this.atendimento.prazoEntregaDocumentos,
      envolvidos: this.atendimento.envolvidos
    });
  }

  editar() {
    const dadosAtualizados: any = {
      '@type': this.form?.value['@type'],
      status: this.form?.value.status,
      area: this.form?.value.area,
      ficha: this.form?.value.ficha,
      historico: this.form?.value.historico,
      prazoEntregaDocumentos: this.form?.value.prazoEntregaDocumentos,
      envolvidos: this.form?.value.envolvidos
    };

    const payload: Payload = {
      body: dadosAtualizados,
      classType: dadosAtualizados.area
    };

    this.atendimentoService.atualizarAtendimento(payload, this.id).subscribe({
      next: () => {
        this.router.navigate(['/atendimentos/list']);
      },
      error: (err) => { },
    });
  }

  excluir(id: string) {
    this.atendimentoService.excluirAtendimento(id).subscribe({
      next: () => {
        alert('Sucesso ao excluir atendimento!');
      },
      error: (err) => { }
    });
  }

  abrirModalExcluir(atendimento: Atendimento) {
    this.dialog.open(ModalExcluidoComponent, {
      width: '372px',
      height: '228px',
      data: {
        tituloCriado: 'Atendimento',
        nome: atendimento.id,
        deletar: () => this.excluir(atendimento.id),
      },
    });
  }

  abrirModalEditar(atendimento: Atendimento): void {
    const dialogRef = this.dialog.open(ModalAtendimentoComponent, {
      width: '552px',
      height: '360px',
      data: {
        operacao: 'Atualizar',
        area: atendimento.area,
        estagiario: atendimento.envolvidos.estagiario.nome,
        assistido: atendimento.envolvidos.assistido.nome,
        status: atendimento.status,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmado') {
        this.editar();
      }
    });
  }

  hasUnsavedChanges(): boolean {
    return this.form ? this.form.dirty : false;
  }
}
