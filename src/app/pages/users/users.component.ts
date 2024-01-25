import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { Usuario } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  tituloDaPagina: string = 'Usuários';
  listaUsuarios: Usuario[] = [];
  colunasMostradas: string[] = [
    'select',
    'matricula',
    'nome',
    'tipo',
    'semestre',
    'status',
  ];
  selection = new SelectionModel<Usuario>(true, []);
  filtro: string = '';

  constructor(private service: CadastroService) {}

  ngOnInit(): void {
    this.service.listar().subscribe({
      next: (response) => {
        console.log('Lista de usuários:', response);
        this.listaUsuarios = response;
      },
      error: (err) => {
        console.error('Erro ao listar usuários:', err);
      }
    });
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
}
