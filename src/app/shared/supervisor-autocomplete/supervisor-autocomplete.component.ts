import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { Usuario } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-supervisor-autocomplete',
  templateUrl: './supervisor-autocomplete.component.html',
  styleUrls: ['./supervisor-autocomplete.component.scss']
})
export class SupervisorAutocompleteComponent implements OnInit {
  @Input() control!: FormControl;

  supervisores: Usuario[] = [];

  filteredOptions$?: Observable<Usuario[]>;

  constructor(private cadastroService: CadastroService){}

  ngOnInit(): void {
    const role = 'PROFESSOR';
    this.cadastroService.listar(role).subscribe(
      dados => {
        this.supervisores = dados;
      }
    );
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filtrarSupervisores(value))
    )
  }

  filtrarSupervisores(value: string | Usuario): Usuario[] {
    const nomeSupervisor = typeof value === 'string' ? value : value?.nome;
    const valorFiltrado = nomeSupervisor?.toLowerCase();
    const result = this.supervisores.filter(
      usuario => usuario.nome.toLowerCase().includes(valorFiltrado)
    )
    return result;
  }

  displayFn (usuario: Usuario): string {
    return usuario && usuario.nome ? usuario.nome : '';
  }
}
