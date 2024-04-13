import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssistidosService } from 'src/app/core/services/assistidos.service';

@Component({
  selector: 'app-assistidos-shortcuts',
  templateUrl: './assistidos-shortcuts.component.html',
  styleUrls: ['./assistidos-shortcuts.component.scss']
})
export class AssistidosShortcutsComponent implements OnInit {
  tituloDaPagina: string;
  nomeAssistido!: string;
  rg!: string;

  constructor(
    private route: ActivatedRoute,
    private assistidosService: AssistidosService
  ) {
    this.tituloDaPagina = 'Assisitido - ';
  }

  ngOnInit(): void {
    this.rg = this.route.snapshot.paramMap.get('rg') as string;

    this.assistidosService.consultar(this.rg).subscribe({
      next: (resposta) => {
        this.nomeAssistido = resposta.nome;
        this.tituloDaPagina = `Assisitido - ${this.nomeAssistido}`;
        console.log(this.nomeAssistido);
      },
      error: (err) => {
        console.log("Erro ao procurar assistido: " + err);
      }
    });
  }
}
