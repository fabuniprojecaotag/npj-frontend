import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { AssistidosService } from 'src/app/assistidos/services/assistidos.service';
import { Assistido } from 'src/app/core/types/assistido';

@Component({
  selector: 'app-assistido-autocomplete',
  templateUrl: './assistido-autocomplete.component.html',
  styleUrls: ['./assistido-autocomplete.component.scss']
})
export class AssistidoAutocompleteComponent implements OnInit {
  @Input() control!: FormControl;

  assistidos: Assistido[] = [];

  filteredOptions$?: Observable<Assistido[]>;

  private carregouAssistidos = false;
  carregando = false;

  constructor(private assistidosService: AssistidosService){}

  ngOnInit(): void {
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filtrarAssistidos(value))
    );
  }

  carregarAssistidos(): void {
    if (!this.carregouAssistidos && !this.carregando) {
      this.carregando = true;
      this.assistidosService.listarAssistidosMin().subscribe({
        next: (dados) => {
          this.assistidos = dados;
          this.carregouAssistidos = true;
          this.carregando = false;
        },
        error: () => {
          this.carregando = false;
        }
      });
    };
  }

  filtrarAssistidos(value: string | Assistido): Assistido[] {
    const nomeAssistido = typeof value === 'string' ? value : value?.nome;
    const valorFiltrado = nomeAssistido?.toLowerCase();
    const result = this.assistidos.filter(
      assistido => assistido.nome.toLowerCase().includes(valorFiltrado)
    );
    return result;
  }

  displayFn (assistido: Assistido): string {
    return assistido && assistido.nome ? assistido.nome : '';
  }
}
