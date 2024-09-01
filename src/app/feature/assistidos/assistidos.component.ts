import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssistidosService } from 'src/app/assistidos/services/assistidos.service';
import { Assistido } from 'src/app/core/types/assistido';

@Component({
  selector: 'app-assistidos',
  templateUrl: './assistidos.component.html',
  styleUrls: ['./assistidos.component.scss'],
})
export class AssistidosComponent implements AfterViewInit {
  tituloPagina = 'Assistidos';
  listaAssistidos: Assistido[] = [];
  dataSource: any;
  colunasMostradas: string[] = ['nome', 'email', 'cpf', 'telefone'];

  constructor(private service: AssistidosService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.service.listarAssistidos().subscribe({
      next: (response) => {
        this.listaAssistidos = response.list;

        this.dataSource = new MatTableDataSource<Assistido>(this.listaAssistidos);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => { },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
