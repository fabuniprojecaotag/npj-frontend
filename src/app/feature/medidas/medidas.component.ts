import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Medida } from '../core/types/medida';
import { MedidasService } from './service/medidas.service';

@Component({
  selector: 'app-medidas',
  templateUrl: './medidas.component.html',
  styleUrls: ['./medidas.component.scss']
})
export class MedidasComponent {
  tituloPagina = 'Lista de Medidas';
  listaMedidasJuridicas: Medida[] = [];
  dataSource: any;
  colunasMostradas: string[] = ['id', 'nome', 'area', 'descricao'];
  // colunas pra impressão que possivelmente serão utilziadas:
  // printConfig: any = [
  //   {
  //     col: 'nome',
  //     title: 'Nome'
  //   },
  //   {
  //     col: 'area',
  //     title: 'Área',
  //   },
  //   {
  //     col: 'descricao',
  //     title: 'Descrição'
  //   },
  // ];
  constructor(private medidasService: MedidasService) { }


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.medidasService.listagemMedidas().subscribe({
      next: (response) => {
        this.listaMedidasJuridicas = response.list;
        this.dataSource = new MatTableDataSource<Medida>(this.listaMedidasJuridicas);
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
