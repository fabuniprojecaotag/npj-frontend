import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Processo } from 'src/app/core/types/processo';
import { ProcessosService } from 'src/app/processos/services/processos.service';

@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.scss'],
})
export class ProcessosComponent implements AfterViewInit {
  tituloPagina = 'Processos';
  listaProcesso: Processo[] = [];
  dataSource: any;
  colunasMostradas: string[] = ['id', 'data', 'vara', 'forum'];
  printConfig: any = [
    {
      col: 'atendimentoId',
      title: 'Cód.Processo'
    },
    {
      col: 'forum',
      title: 'Fórum'
    },
    {
      col: 'dataDistribuicao',
      title: 'Data Distribuição',
      format: 'formatDate'
    },
    {
      col: 'vara',
      title: 'Vara'
    },
  ];

  constructor(private service: ProcessosService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.service.listar().subscribe({
      next: (response) => {
        this.listaProcesso = response;

        this.dataSource = new MatTableDataSource<Processo>(this.listaProcesso);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => { }
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
