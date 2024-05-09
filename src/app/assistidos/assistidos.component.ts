import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssistidosService } from 'src/app/core/services/assistidos.service';
import { Assistido } from 'src/app/core/types/assistido';
import { ModalErrosComponent } from 'src/app/shared/modal-erros/modal-erros.component';

@Component({
  selector: 'app-assistidos',
  templateUrl: './assistidos.component.html',
  styleUrls: ['./assistidos.component.scss'],
})
export class AssistidosComponent implements AfterViewInit {
  tituloPagina = `Assistidos`;
  listaAssistidos: Assistido[] = [];
  dataSource: any;
  colunasMostradas: string[] = ['nome', 'email', 'cpf', 'telefone'];

  constructor(private service: AssistidosService, private dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.service.listarAssistidos().subscribe({
      next: (response) => {
        this.listaAssistidos = response;
        console.log(response);

        this.dataSource = new MatTableDataSource<Assistido>(this.listaAssistidos);
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
