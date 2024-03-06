import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormProcessosService } from 'src/app/core/services/form-processos.service';
import { ProcessosService } from 'src/app/core/services/processos.service';
import { Processo } from 'src/app/core/types/processo';
import { ModalCriadoComponent } from 'src/app/shared/modal-criado/modal-criado.component';

@Component({
  selector: 'app-processo-add',
  templateUrl: './processo-add.component.html',
  styleUrls: ['./processo-add.component.scss']
})
export class ProcessoAddComponent implements OnInit {
  tituloDaPagina: string = 'Novo Processo';

  constructor(private formProcessosService: FormProcessosService,
    private processoService: ProcessosService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog) { }
    
    isEditable: any = false

    ngOnInit(): void {

      const id = this.route.snapshot.paramMap.get('numero') as string
      // console.log(this.isEditable)
      if(id!=undefined){
        console.log(`edicao`)
      
      }else{
        console.log(`cadastro`)
      }

    }

  cadastrar(): void {

    const formCadastroProcessso = this.formProcessosService.getCadastro();

    if (formCadastroProcessso?.valid) {
      const novoProcesso = formCadastroProcessso.getRawValue() as Processo;
      console.log('meu assistido processo:', novoProcesso);

      this.processoService.cadastrarProcesso(novoProcesso).subscribe({
        next: (value) => {
          this.abrirModal(value);
          this.router.navigate(['/processos']);
          console.log('cadastro realizado com  sucesso: ', value);
        },
        error: (err) => {
          alert('erro ao realizar cadastro!');
          console.log('erro ao realizar cadastro: ', err)
        }
      })
    }
  }

  abrirModal(novoProcesso: Processo) {
    this.dialog.open(ModalCriadoComponent, {
      width: '552px',
      height: '360px',
      data: {tituloCriado: 'Processo', nome: novoProcesso.nome,numero:novoProcesso.numero}
    })
  }
}
