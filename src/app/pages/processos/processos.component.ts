import { Component } from '@angular/core';
import { ProcessosService } from 'src/app/core/services/processos.service';
import { Processo } from 'src/app/core/types/processo';
import { isNull,formatDate } from 'src/app/utils/functios.service';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.scss']
})
export class ProcessosComponent {
  
  isNull = isNull;
  formatDate = formatDate
  isLoading:boolean = true;
  tituloPagina = `Processos`;
  listaProcessos: Processo[] = [];
  colunasMostradas: string[] = [
    'select',
    'numero',
    'nome',
    'vara',
    'forum',
    'dataDistribuicao',
  ];
  selection = new SelectionModel<any>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listaProcessos.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.listaProcessos.forEach(row => this.selection.select(row));
  }

  constructor(private service: ProcessosService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.service.listarProcessos().subscribe({
      next: (response) => {
        this.listaProcessos = response;
        this.listaProcessos.forEach((processo:any) => {
          Object.keys(processo).forEach((key) => {
            if(/^\d{4}-\d{2}-\d{2}$/.test(processo[key])){
              processo[key] = formatDate(processo[key]);
            }else{
              processo[key] = isNull(processo[key]);
            }
          });
        });
        this.isLoading = false;
        console.log("lista de processos:", response);
      },
      error: (err) => {
        this.isLoading = false;
        console.log("erro ao coletar lista de processos:", err);
      }
    });
  }
}
