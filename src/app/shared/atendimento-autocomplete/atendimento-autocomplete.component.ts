import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AtendimentosService } from 'src/app/core/services/atendimentos.service';
import { Atendimento } from 'src/app/core/types/atendimento';

@Component({
  selector: 'app-atendimento-autocomplete',
  templateUrl: './atendimento-autocomplete.component.html',
  styleUrls: ['./atendimento-autocomplete.component.scss']
})
export class AtendimentoAutocompleteComponent {
  @Input() control!: FormControl;

  atendimento: Atendimento[] = [];

  filteredOptions$?: Observable<Atendimento[]>;

  constructor(private atendimentoService: AtendimentosService){}

  ngOnInit(): void {
    this.atendimentoService.listagemAtendimentos().subscribe(
      dados => {
        this.atendimento = dados;
      }
    );
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filtrarAtendimento(value))
    )
  }

  filtrarAtendimento(value: string | Atendimento): Atendimento[] {
    const nomeAtendimento = typeof value === 'string' ? value : value?.id;
    const valorFiltrado = nomeAtendimento?.toLowerCase();
    const result = this.atendimento.filter(
      atendimento => atendimento.id.toLowerCase().includes(valorFiltrado)
    )
    return result;
  }

  displayFn (atendimento: Atendimento): string {
    return atendimento && atendimento.id ? atendimento.id : '';
  }
}
