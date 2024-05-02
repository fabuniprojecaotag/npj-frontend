import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AssistidosService } from 'src/app/core/services/assistidos.service';
import { Atendimento } from 'src/app/core/types/atendimento';
import { Processo } from 'src/app/core/types/processo';
import { ModalAtalhosComponent } from 'src/app/shared/modal-atalhos/modal-atalhos.component';

@Component({
  selector: 'app-assistidos-shortcuts',
  templateUrl: './assistidos-shortcuts.component.html',
  styleUrls: ['./assistidos-shortcuts.component.scss'],
})
export class AssistidosShortcutsComponent implements OnInit {
  tituloDaPagina: string;
  nomeAssistido!: string;
  cpf!: string;
  listaAtendimento: Atendimento[] = [];
  listaProcesso: Processo[] = [];

  constructor(
    private route: ActivatedRoute,
    private assistidosService: AssistidosService,
    private dialog: MatDialog
  ) {
    this.tituloDaPagina = 'Assisitido - ';
  }

  ngOnInit(): void {
    this.cpf = this.route.snapshot.paramMap.get('cpf') as string;

    this.assistidosService.consultar(this.cpf).subscribe({
      next: (resposta) => {
        this.nomeAssistido = resposta.nome;
        this.tituloDaPagina = `Assisitido - ${this.nomeAssistido}`;
      },
      error: () => {
        alert('Erro ao procurar assistido');
      },
    });
  }

  abrirModalAtendimento() {
    this.dialog.open(ModalAtalhosComponent, {
      width: '1200px',
      height: '650px',
      data: { titulo: 'Atendimentos',lista: this.listaAtendimento }
    });
  }

  abrirModalProcesso() {
    this.dialog.open(ModalAtalhosComponent, {
      width: '1200px',
      height: '650px',
      data: { titulo: 'Processos',lista: this.listaProcesso }
    });
  }
}
