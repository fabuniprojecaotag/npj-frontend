import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AtendimentosService } from 'src/app/atendimentos/services/atendimentos.service';
import { FormsService } from 'src/app/core/services/forms.service';
import { Atendimento } from 'src/app/core/types/atendimento';
import { ModalAtendimentoComponent } from 'src/app/shared/modal-atendimento/modal-atendimento.component';

@Component({
  selector: 'app-atendimento-add',
  templateUrl: './atendimento-add.component.html',
  styleUrls: ['./atendimento-add.component.scss'],
})
export class AtendimentoAddComponent implements OnInit {
  tituloPagina = 'Nova Ficha';
  tipoFicha!: string;
  novoAtendimento!: Atendimento;

  constructor(
    private formAtendimentoService: FormsService,
    private atendimentoService: AtendimentosService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.tipoFicha = this.route.snapshot.paramMap.get('ficha') as string;
  }

  cadastrar(): void {
    const formAtendimento = this.formAtendimentoService.getForm();

    if (formAtendimento?.valid) {
      this.novoAtendimento = formAtendimento.getRawValue() as Atendimento;

      this.atendimentoService.cadastrarAtendimento(this.novoAtendimento).subscribe({
        next: () => {
          this.dialogoCriar(this.novoAtendimento);
        },
        error: (err) => { },
      });
    }
  }

  dialogoCriar(atendimento: Atendimento): void {
    const dialogRef = this.dialog.open(ModalAtendimentoComponent, {
      width: '552px',
      height: '360px',
      data: {
        operacao: 'Cadastrar',
        area: atendimento.area,
        estagiario: atendimento.envolvidos.estagiario.nome,
        assistido: atendimento.envolvidos.assistido.nome,
        status: atendimento.status,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmado') {
        this.router.navigate(['/atendimentos/list']);
      }
    });
  }

}
