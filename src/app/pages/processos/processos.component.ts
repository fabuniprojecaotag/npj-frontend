import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProcessosService } from 'src/app/core/services/processos.service';
import { Processo } from 'src/app/core/types/processo';
import { ModalErrosComponent } from 'src/app/shared/modal-erros/modal-erros.component';

@Component({
  selector: 'app-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.scss'],
})
export class ProcessosComponent {
  tituloPagina = 'Processos';
  listaProcesso: Processo[] = [];
  dataSource: any;
  colunasMostradas: string[] = ['id', 'data', 'vara', 'forum'];
  printConfig:any = [
    {col:'atendimentoId',
      title:'Cód.Processo'
    }, 
    {col:'forum',
      title:'Fórum'
    }, 
    {col:'dataDistribuicao',
      title:'Data Distribuição',
      format: 'formatDate'
    }, 
    {col:'vara',
      title:'Vara'
    }, 
  ]
  constructor(private service: ProcessosService, private dialog: MatDialog) {}


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.service.listar().subscribe({
      next: (response) => {
        this.listaProcesso = response;

        this.dataSource = new MatTableDataSource<Processo>(this.listaProcesso);
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        let errorMessage = '';
        switch (err.status) {
          case 401: {
            errorMessage = "Não Autorizado!";
            this.mostrarMensagemErro('401', errorMessage);
            break;
          }
          case 404: {
            errorMessage = "Recurso não encontrado!";
            this.mostrarMensagemErro('404', errorMessage);
            break;
          }
          case 408: {
            errorMessage = "Servidor demorou muito para responder!";
            this.mostrarMensagemErro('408', errorMessage);
            break;
          }
          default: {
            errorMessage = `Por favor tente mais tarde!`;
            this.mostrarMensagemErro('Desconhecido', errorMessage);
            break;
          }
        }
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

  mostrarMensagemErro(codigoErro: string, mensagemErro: string) {
    let subtituloErro: string = 'Erro ao listar';

    this.dialog.open(ModalErrosComponent, {
      width: '552px',
      height: '360px',
      position: { top: '0' },
      data: { codigoErro: codigoErro, subtituloErro: subtituloErro, mensagemErro: mensagemErro }
    })
  }
}
