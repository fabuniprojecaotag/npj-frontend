import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  tituloDaPagina: string = 'Usuários';
  listaUsuarios: any[] = [];
  colunasMostradas: string[] = [
    'select',
    'matricula',
    'nome',
    'tipo',
    'semestre',
    'status',
    'opcoes',
  ];
  selection = new SelectionModel<Usuario>(true, []);
  filtro: string = '';

  constructor(private service: UsuarioService) {}

  ngOnInit(): void {
    this.service.listar().subscribe(
      (response: any) => {
        console.log('Response:', response);
        this.listaUsuarios = response.result[0];
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  /** Ve se tudo ta selecionado (do exemplo do material) */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listaUsuarios.length;
    return numSelected === numRows;
  }

  /** Selecionar tudo (do exemplo do material) */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.listaUsuarios.forEach((row) => this.selection.select(row));
  }

  editUser(usuario: any) {
    console.log('edit user');
    console.log(usuario);
  }
}
