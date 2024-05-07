import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AssistidosService } from 'src/app/core/services/assistidos.service';
import { AtendimentosService } from 'src/app/core/services/atendimentos.service';
import { ProcessosService } from 'src/app/core/services/processos.service';
import { Atendimento } from 'src/app/core/types/atendimento';
import { filtro } from 'src/app/core/types/filtro';
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
    private atendimentoService: AtendimentosService,
    private processoService: ProcessosService,
    private dialog: MatDialog
  ) {
    this.tituloDaPagina = 'Assisitido - ';
  }

  ngOnInit(): void {
    this.cpf = this.route.snapshot.paramMap.get('cpf') as string;
    let filtroAtendimentos: filtro = {
      field: 'envolvidos.assistido',
      filter: 'EQUAL',
      value: this.nomeAssistido
    };

    this.assistidosService.consultar(this.cpf).subscribe({
      next: (resposta) => {
        this.nomeAssistido = resposta.nome;
        this.tituloDaPagina = `Assisitido - ${this.nomeAssistido}`;
      },
      error: () => {
        alert('Erro ao procurar assistido');
      },
    });

    this.atendimentoService.listagemAtendimentos().subscribe({
      next: (resposta) => {
        this.listaAtendimento = resposta;
        console.log("Atendimentos: " + resposta);
      }
    });

    this.processoService.listar().subscribe({
      next: (resposta) => {
        this.listaProcesso = resposta;
        console.log("Processos: " + resposta);
      }
    });
  }

  abrirModalAtendimento() {
    this.dialog.open(ModalAtalhosComponent, {
      width: '1200px',
      height: '650px',
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
