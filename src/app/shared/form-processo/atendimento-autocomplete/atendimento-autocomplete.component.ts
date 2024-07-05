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

  private carregouAtendimentos = false;
  carregando = false;

  constructor(private atendimentoService: AtendimentosService) { }

  ngOnInit(): void {
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filtrarAtendimento(value))
    );
  }

  carregarAtendimentos(): void {
    if (!this.carregouAtendimentos && !this.carregando) {
      this.carregando = true;
      this.atendimentoService.listagemAtendimentoAutocomplete().subscribe(
        dados => {
          this.atendimento = dados;
          this.carregouAtendimentos = true;
          this.carregando = false;
        },
        error => {
          this.carregando = false;
          alert('Falha ao carregar dados de atendimentos.');
        }
      );
    }
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

  onInputFocus(): void {
    this.carregarAtendimentos();
  }
}
