import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Processo } from 'src/app/core/types/processo';
import { ProcessosService } from 'src/app/feature/processos/services/processos.service';
import { DEFAULT_PAGE_SIZE } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.scss'],
})
export class ProcessosComponent implements AfterViewInit {
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
  initialPageSize: number = DEFAULT_PAGE_SIZE;

  constructor(private service: ProcessosService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.loadInitialData());
  }
  
  loadInitialData(): void {
    this.service.getPaginatedData().subscribe((data) => {
      this.dataSource.data = data.list;
      this.paginator.length = data.totalSize; 
    });
  }
  
  onPageChange(event: PageEvent): void {
    this.service.getPaginatedData(event).subscribe((data) => {
      this.dataSource.data = data.list;
      this.paginator.length = data.totalSize;
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
