import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { CadastroService } from 'src/app/autenticacao/services/cadastro.service';
import { Filtro } from 'src/app/core/types/filtro';
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

  private carregouUsuarios = false;
  carregando = false;

  constructor(private cadastroService: CadastroService){}

  ngOnInit(): void {
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filtrarSupervisores(value))
    );
  }

  carregarUsuarios(): void {
    if (!this.carregouUsuarios && !this.carregando) {
      this.carregando = true;
      const filtro: Filtro = {
        field: 'role',
        filter: 'EQUAL',
        value: this.cargo.toLocaleUpperCase()
      };
      this.cadastroService.listarUsuariosForAutoComplete(filtro).subscribe(
        dados => {
          this.funcionarios = dados.list;
          this.carregouUsuarios = true;
          this.carregando = false;
        },
        error => {
          this.carregando = false;
          alert('Falha ao carregar dados de usuários.');
        }
      );
    }
  }

  filtrarSupervisores(value: string | Usuario): Usuario[] {
    const nomeSupervisor = typeof value === 'string' ? value : value?.nome;
    const valorFiltrado = nomeSupervisor?.toLowerCase();
    const result = this.funcionarios.filter(
      usuario => usuario.nome.toLowerCase().includes(valorFiltrado)
    );
    return result;
  }

  displayFn(usuario: Usuario | null): string {
    return usuario && usuario.nome ? usuario.nome : '';
  }

  onInputFocus(): void {
    this.carregarUsuarios();
  }
}
