import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { Usuario } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  tituloDaPagina: string = 'Usuários';
  listaUsuarios: any[] = [];
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
}
