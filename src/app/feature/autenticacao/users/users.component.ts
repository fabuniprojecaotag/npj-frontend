import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CadastroService } from 'src/app/feature/autenticacao/services/cadastro.service';
import { Usuario } from 'src/app/core/types/usuario';
import { ModalExcluidoComponent } from 'src/app/shared/components/modal-excluido/modal-excluido.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit {
  tituloDaPagina = 'Usuários';
  listaUsuarios: Usuario[] = [];
  dataSource: any;
  colunasMostradas: string[] = [
    'select',
    'id',
    'nome',
    'role',
    'edicao',
    'exclusao'
  ];
  selection = new SelectionModel<Usuario>(true, []);

  constructor(private service: CadastroService, private dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.service.listarUsuarios().subscribe({
      next: (response) => {
        this.listaUsuarios = response.list;

        // Inicializa a seleção com base no status dos usuários
        this.selection = new SelectionModel<Usuario>(
          true,
          this.listaUsuarios.filter((user) => user.status)
        );

        this.dataSource = new MatTableDataSource<Usuario>(this.listaUsuarios);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => { },
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  abrirModalExcluir(user: Usuario) {
    this.dialog.open(ModalExcluidoComponent, {
      width: '372px',
      height: '228px',
      data: {
        tituloCriado: 'Usuário',
        nome: user.nome,
        deletar: () => this.excluir(user.id),
      },
    });
  }

  excluir(idCadastro: string) {
    this.service.excluirCadastro(idCadastro).subscribe({
      next: () => {
        window.location.reload();
      },
      error: () => {
        alert('Erro ao excluir o usuário!');
      },
    });
  }

  formatarNomePerfil(nome: string): string {
    return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
  }
}
