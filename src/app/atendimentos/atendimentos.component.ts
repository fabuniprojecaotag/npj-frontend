import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AtendimentosService } from 'src/app/atendimentos/services/atendimentos.service';
import { Atendimento } from 'src/app/core/types/atendimento';
import { ModalErrosComponent } from 'src/app/shared/modal-erros/modal-erros.component';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styleUrls: ['./atendimentos.component.scss'],
})
export class AtendimentosComponent implements AfterViewInit {
  tituloPagina = 'Lista de Atendimentos';
  listaAtendimentos: Atendimento[] = [];
  dataSource: any;
  colunasMostradas: string[] = ['id', 'tipo', 'status', 'dataDeCriacao'];
  printConfig:any = [
    {col:'id',
      title:'Cód.Atendimento'
    },
    {col:'area',
      title:'Tipo'
    },
    {col:'dataCriacao',
      title:'Data Criação',
      format: 'formatDate'
    },
    {col:'status',
      title:'Status'
    },
  ]
  constructor(private atendimentoService: AtendimentosService, private dialog: MatDialog) {}


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
    let subtituloErro = 'Erro ao listar';
    this.dialog.open(ModalErrosComponent, {
      width: '552px',
      height: '360px',
      position: { top: '0' },
      data: { codigoErro: codigoErro, subtituloErro: subtituloErro, mensagemErro: mensagemErro }
    })
  }
}
