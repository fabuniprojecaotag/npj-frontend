import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { Usuario } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  tituloDaPagina: string = 'Usuários';
  listaUsuarios: Usuario[] = [];
  colunasMostradas: string[] = ['select', 'matricula', 'nome', 'tipo', 'semestre', 'status'];
  selection = new SelectionModel<Usuario>(true, []);
  paginaAtual: number = 0;
  filtro: string = '';

  constructor(private service: CadastroService) { }

  ngOnInit(): void {
    // this.service.listar().subscribe({
    //   next: (resposta) => {
    //     this.listaUsuarios = resposta;
    //   },
    //   error: (err) => {
    //     console.log('erro ao consultar usuários:',err);
    //   }
    // })
  }

  /** Ve se tudo ta selecionado (do exemplo do material) */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listaUsuarios.length;
    return numSelected === numRows;
  }

  /** Selecionar tudo (do exemplo do material) */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.listaUsuarios.forEach(row => this.selection.select(row));
  }
}
