import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormsService } from 'src/app/core/services/forms.service';
import { Processo } from 'src/app/core/types/processo';
import { ProcessosService } from 'src/app/feature/processos/services/processos.service';
import { ModalProcessoComponent } from 'src/app/shared/components/modal-processo/modal-processo.component';

@Component({
  selector: 'app-processo-add',
  templateUrl: './processo-add.component.html',
  styleUrls: ['./processo-add.component.scss'],
})
export class ProcessoAddComponent {
  tituloPagina = 'Novo Processo';

  constructor(
    private processsoService: ProcessosService,
    private formService: FormsService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  cadastrar() {
    const formCadastroProcesso = this.formService.getForm();

    if (formCadastroProcesso?.valid) {
      const novoCadastro = formCadastroProcesso.getRawValue() as Processo;
      this.processsoService.save(novoCadastro).subscribe({
        next: () => {
          this.abrirModal(novoCadastro);
          formCadastroProcesso.reset();
        },
        error: (err) => { },
      });
    }
  }

  cadastrarNavegando() {
    this.cadastrar();
    this.router.navigate(['/processos/list']);
  }

  abrirModal(novoProcesso: Processo) {
    this.dialog.open(ModalProcessoComponent, {
      width: '552px',
      height: '360px',
      data: {
        operacao: 'criado',
        numero: novoProcesso.numero,
        nome: novoProcesso.nome,
        atendimentoId: novoProcesso.atendimentoId,
        assistidoId: novoProcesso.assistidoId,
      },
    });
  }
}
