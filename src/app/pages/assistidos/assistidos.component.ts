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
  tituloPagina = `Assistidos`;
  listaAssistidos: Assistido[] = [];
  colunasMostradas: string[] = [
    'nome',
    'email',
    'cpf',
    'enderecoResidencial',
  ];

  constructor(private service: AssistidosService) {}

  ngOnInit(): void {
    this.service.listarAssistidos().subscribe({
      next: (response) => {
        this.listaAssistidos = response;
        console.log("lista de assistidos:", response);
      },
      error: (err) => {
        console.log("erro ao coletar lista de assistidos:", err);
      }
    });
  }
}
