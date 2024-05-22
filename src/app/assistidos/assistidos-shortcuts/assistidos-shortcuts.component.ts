import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AssistidosService } from 'src/app/assistidos/services/assistidos.service';
import { Assistido } from 'src/app/core/types/assistido';
import { Atendimento } from 'src/app/core/types/atendimento';
import { Processo } from 'src/app/core/types/processo';
import { ProcessosService } from 'src/app/processos/services/processos.service';
import { ModalAtalhosComponent } from 'src/app/shared/modal-atalhos/modal-atalhos.component';
import { ModalEditAssistidoComponent } from './modal-edit-assistido/modal-edit-assistido.component';

@Component({
  selector: 'app-assistidos-shortcuts',
  templateUrl: './assistidos-shortcuts.component.html',
  styleUrls: ['./assistidos-shortcuts.component.scss'],
})
export class AssistidosShortcutsComponent implements OnInit {
  assistido!: Assistido;
  tituloDaPagina: string;
  cpf!: string;
  listaAtendimento: Atendimento[] = [];
  listaProcesso: Processo[] = [];

  constructor(
    private route: ActivatedRoute,
    private assistidosService: AssistidosService,
    private processoService: ProcessosService,
    private dialog: MatDialog
  ) {
    this.tituloDaPagina = 'Assisitido - ';
  }

  ngOnInit(): void {
    this.cpf = this.route.snapshot.paramMap.get('cpf') as string;

    this.assistidosService.consultarAssistido(this.cpf).subscribe({
      next: (resposta) => {
        this.assistido = resposta;
        this.tituloDaPagina = `Assisitido - ${this.assistido.nome}`;
      },
      error: () => { },
    });

    this.assistidosService.listagemAtendimentosDoAssistido(this.cpf).subscribe({
      next: (resposta) => {
        this.listaAtendimento = resposta;
      }
    });

    this.processoService.listar().subscribe({
      next: (resposta) => {
        this.listaProcesso = resposta;
      }
    });
  }

  abrirModalEditar() {
    if (this.assistido) {
      this.dialog.open(ModalEditAssistidoComponent, {
        width: '1200px',
        height: '650px',
        data: { assistido: this.assistido }
      });
    }
  }


  abrirModalAtendimento() {
    this.dialog.open(ModalAtalhosComponent, {
      width: '1200px',
      height: '650px',
      maxHeight: '100vh',
      data: { titulo: 'Atendimentos', listaAtendimento: this.listaAtendimento }
    });
  }

  abrirModalProcesso() {
    this.dialog.open(ModalAtalhosComponent, {
      width: '1200px',
      height: '650px',
      data: { titulo: 'Processos', listaProcesso: this.listaProcesso }
    });
  }
}
