import { Component, Input, OnInit } from '@angular/core';
import { Atendimento } from 'src/app/core/types/atendimento';

@Component({
  selector: 'app-card-atendimentos',
  templateUrl: './card-atendimentos.component.html',
  styleUrls: ['./card-atendimentos.component.scss']
})
export class CardAtendimentosComponent implements OnInit {
  @Input() atendimento!: Atendimento;

  ngOnInit(): void {
    console.log(this.atendimento);
  }
}
