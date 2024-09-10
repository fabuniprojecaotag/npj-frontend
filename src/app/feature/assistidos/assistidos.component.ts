import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssistidosService } from 'src/app/feature/assistidos/services/assistidos.service';
import { Assistido } from 'src/app/core/types/assistido';
import { DEFAULT_PAGE_SIZE } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-assistidos',
  templateUrl: './assistidos.component.html',
  styleUrls: ['./assistidos.component.scss'],
})
export class AssistidosComponent implements AfterViewInit {
  tituloPagina = 'Assistidos';
  listaAssistidos: Assistido[] = [];
  dataSource = new MatTableDataSource<Assistido>(this.listaAssistidos);
  colunasMostradas: string[] = ['nome', 'email', 'cpf', 'telefone'];
  initialPageSize: number = DEFAULT_PAGE_SIZE;

  constructor(private service: AssistidosService) {}

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
