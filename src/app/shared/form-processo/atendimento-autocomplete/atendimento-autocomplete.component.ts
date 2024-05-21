import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { AtendimentosService } from 'src/app/atendimentos/services/atendimentos.service';
import { Atendimento } from 'src/app/core/types/atendimento';

@Component({
  selector: 'app-atendimento-autocomplete',
  templateUrl: './atendimento-autocomplete.component.html',
  styleUrls: ['./atendimento-autocomplete.component.scss']
})
export class AtendimentoAutocompleteComponent implements OnInit {
  @Input() control!: FormControl;

  atendimento: Atendimento[] = [];

  filteredOptions$?: Observable<Atendimento[]>;

  constructor(private atendimentoService: AtendimentosService) { }

  ngOnInit(): void {
    this.atendimentoService.listagemAtendimentos().subscribe(
      dados => {
        this.atendimento = dados;
      }
    );
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filtrarAtendimento(value))
    );
  }

  filtrarAtendimento(value: string): Atendimento[] {
    const valorFiltrado = value ? value.toLowerCase() : '';
    const result = this.atendimento.filter(
      atendimento => atendimento.id.toLowerCase().includes(valorFiltrado)
    );
    return result;
  }


  displayFn(atendimentoId: string): string {
    return atendimentoId;
  }
}
