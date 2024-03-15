import { Component } from '@angular/core';
import { AtendimentosService } from 'src/app/core/services/atendimentos.service';
import { Atendimento } from 'src/app/core/types/atendimento';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styleUrls: ['./atendimentos.component.scss'],
})
export class AtendimentosComponent {
  tituloPagina = 'Lista de Atendimentos';
  listaAtendimentos: Atendimento[] = [];
  colunasMostradas: string[] = [
    'id',
    //'assistido',
    'tipo',
    'status',
    'dataDeCriacao',
  ];

  constructor(private atendimentoService: AtendimentosService) {}

  ngOnInit(): void {
    this.atendimentoService.listagemAtendimentos().subscribe({
      next: (response) => {
        this.listaAtendimentos = response;
        console.log('lista de atendimentos:', response);
      },
      error: (err) => {
        console.log('erro ao coletar lista de atendimentos:', err);
      },
    });
  }
}
