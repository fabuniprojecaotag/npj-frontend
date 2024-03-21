import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { Usuario } from 'src/app/core/types/usuario';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit {
  tituloDaPagina: string = 'Usuários';
  listaUsuarios: Usuario[] = [];
  dataSource: any;
  colunasMostradas: string[] = [
    'select',
    'matricula',
    'nome',
    'role',
    'semestre',
    'status',
  ];
  selection = new SelectionModel<Usuario>(true, []);
  // filtro: string = '';

  constructor(private service: CadastroService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.service.listar().subscribe({
      next: (response) => {
        console.log('Lista de usuários:', response);
        this.listaUsuarios = response;

        // Inicializa a seleção com base no status dos usuários
        this.selection = new SelectionModel<Usuario>(true, this.listaUsuarios.filter(user => user.status));

        this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);
        this.dataSource.paginator = this.paginator;
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
