import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Medida } from '../../core/types/medida';
import { MedidasService } from './service/medidas.service';
import { DEFAULT_PAGE_SIZE } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-medidas',
  templateUrl: './medidas.component.html',
  styleUrls: ['./medidas.component.scss']
})
export class MedidasComponent implements AfterViewInit {
  tituloPagina = 'Lista de Medidas';
  listaMedidasJuridicas: Medida[] = [];
  dataSource = new MatTableDataSource<Medida>(this.listaMedidasJuridicas);
  colunasMostradas: string[] = ['id', 'nome', 'area', 'descricao'];
  initialPageSize: number = DEFAULT_PAGE_SIZE;
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
  constructor(private service: MedidasService) { }

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
