import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Itens por página'; 
  override getRangeLabel= (page: number, pageSize: number, length: number) => `${page+1} de ${length+1}`;
}
