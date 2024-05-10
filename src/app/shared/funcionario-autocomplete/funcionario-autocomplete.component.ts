import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { CadastroService } from 'src/app/autenticacao/services/cadastro.service';
import { filtro } from 'src/app/core/types/filtro';
import { Usuario } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-funcionario-autocomplete',
  templateUrl: './funcionario-autocomplete.component.html',
  styleUrls: ['./funcionario-autocomplete.component.scss']
})
export class FuncionarioAutocompleteComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() cargo!: string;

  funcionarios: Usuario[] = [];

  filteredOptions$?: Observable<Usuario[]>;

  constructor(private cadastroService: CadastroService){}

  ngOnInit(): void {
    let filtro: filtro = {
      field: 'role',
      filter: 'EQUAL',
      value: this.cargo.toLocaleUpperCase()
    }
    this.cadastroService.listar(filtro).subscribe(
      dados => {
        this.funcionarios = dados;
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
    const result = this.funcionarios.filter(
      usuario => usuario.nome.toLowerCase().includes(valorFiltrado)
    )
    return result;
  }

  displayFn (usuario: Usuario): string {
    return usuario && usuario.nome ? usuario.nome : '';
  }
}
