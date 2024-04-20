import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProcessosService } from 'src/app/core/services/processos.service';
import { Processo } from 'src/app/core/types/processo';

@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.scss'],
})
export class ProcessosComponent {
  tituloPagina = 'Processos';
  listaProcesso: Processo[] = [];
  dataSource: any;
  colunasMostradas: string[] = ['id', 'data', 'vara', 'forum'];

  constructor(private service: ProcessosService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.service.listar().subscribe({
      next: (response) => {
        this.listaProcesso = response;

        this.dataSource = new MatTableDataSource<Processo>(this.listaProcesso);
        this.dataSource.paginator = this.paginator;
      },
      error: () => {
        alert('Erro ao listar processos');
      },
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
