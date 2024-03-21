import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AtendimentosService } from 'src/app/core/services/atendimentos.service';
import { Atendimento } from 'src/app/core/types/atendimento';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styleUrls: ['./atendimentos.component.scss'],
})
export class AtendimentosComponent implements AfterViewInit {
  tituloPagina = 'Lista de Atendimentos';
  listaAtendimentos: Atendimento[] = [];
  dataSource: any;
  colunasMostradas: string[] = [
    'id',
    //'assistido',
    'tipo',
    'status',
    'dataDeCriacao',
  ];

  constructor(private atendimentoService: AtendimentosService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.atendimentoService.listagemAtendimentos().subscribe({
      next: (response) => {
        this.listaAtendimentos = response;
        this.dataSource = new MatTableDataSource<Atendimento>(this.listaAtendimentos);
        this.dataSource.paginator = this.paginator;
        console.log('lista de atendimentos:', response);
      },
      error: (err) => {
        console.log('erro ao coletar lista de atendimentos:', err);
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
