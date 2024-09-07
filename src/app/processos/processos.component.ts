import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Processo } from 'src/app/core/types/processo';
import { ProcessosService } from 'src/app/processos/services/processos.service';

@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.scss'],
})
export class ProcessosComponent implements OnInit {
  tituloPagina = 'Processos';
  listaProcesso: Processo[] = [];
  dataSource = new MatTableDataSource<Processo>(this.listaProcesso);
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
  pageSize: number = 10;

  constructor(private service: ProcessosService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.loadInitialData(this.pageSize);
  }

  loadInitialData(pageSize: number): void {
    this.service.getPaginatedData(pageSize).subscribe((data) => {
      this.dataSource.data = data.list.slice(0, pageSize);
      this.paginator.length = data.totalSize; 
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    const pageIndex = event.pageIndex;

    // Calcular índices baseados no tamanho da página e no índice atual
    const startIndex = pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.service.getPaginatedData(this.pageSize, startIndex, endIndex).subscribe((data) => {
      this.dataSource.data = data.list;
      this.paginator.length = data.totalSize;
    });
  }
}
