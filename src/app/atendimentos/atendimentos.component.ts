import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AtendimentosService } from 'src/app/atendimentos/services/atendimentos.service';
import { Atendimento } from '../core/types/atendimento';
import { DEFAULT_PAGE_SIZE } from '../shared/constants/constants';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styleUrls: ['./atendimentos.component.scss'],
})
export class AtendimentosComponent implements OnInit {
  tituloPagina = 'Lista de Atendimentos';
  dataSource = new MatTableDataSource<Atendimento>();
  colunasMostradas: string[] = ['id', 'tipo', 'status', 'dataDeCriacao'];
  printConfig: any = [
    {
      col: 'id',
      title: 'Cód.Atendimento',
    },
    {
      col: 'area',
      title: 'Tipo',
    },
    {
      col: 'instante',
      title: 'Data Criação',
      format: 'formatDate',
    },
    {
      col: 'status',
      title: 'Status',
    },
  ];
  initialPageSize: number = DEFAULT_PAGE_SIZE;

  constructor(private service: AtendimentosService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadInitialData();
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
