import { Component } from '@angular/core';
import { AssistidosService } from 'src/app/core/services/assistidos.service';
import { Assistido } from 'src/app/core/types/assistido';
import { Callback } from 'src/app/core/types/callback';

@Component({
  selector: 'app-assistidos',
  templateUrl: './assistidos.component.html',
  styleUrls: ['./assistidos.component.scss']
})
export class AssistidosComponent {
  nomeAssistido = 'Carlos';
  tituloPagina = `Assistido - ${this.nomeAssistido}`;
  listaAssistidos: Assistido[] = [];
  colunasMostradas: string[] = [
    'nome',
    'email',
    'cpf',
  ];
  paginaAtual: number = 0;
  filtro: string = '';

  constructor(private service: AssistidosService) {}

  ngOnInit(): void {
    this.service.listarAssistidos().subscribe({
      next: (response: Callback) => {
        this.listaAssistidos = response.result;
        console.log("lista de assistidos:", response.result);
      },
      error: (err) => {
        console.log("erro ao coletar lista de assistidos:", err);
      }
    });
  }
}
