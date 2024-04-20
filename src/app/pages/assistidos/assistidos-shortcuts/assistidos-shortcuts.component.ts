import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssistidosService } from 'src/app/core/services/assistidos.service';

@Component({
  selector: 'app-assistidos-shortcuts',
  templateUrl: './assistidos-shortcuts.component.html',
  styleUrls: ['./assistidos-shortcuts.component.scss'],
})
export class AssistidosShortcutsComponent implements OnInit {
  tituloDaPagina: string;
  nomeAssistido!: string;
  cpf!: string;

  constructor(
    private route: ActivatedRoute,
    private assistidosService: AssistidosService
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
}
