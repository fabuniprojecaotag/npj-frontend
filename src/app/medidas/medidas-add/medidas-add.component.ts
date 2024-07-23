import { FormsService } from 'src/app/core/services/forms.service';
import { Component } from '@angular/core';
import { Medida } from 'src/app/core/types/medida';
import { MedidasService } from '../service/medidas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medidas-add',
  templateUrl: './medidas-add.component.html',
  styleUrls: ['./medidas-add.component.scss']
})
export class MedidasAddComponent {
  tituloPagina = 'Nova Medida Jurídica';

  constructor(
    private formService: FormsService,
    private medidasService: MedidasService,
    private router: Router
  ) { }

  cadastrar() {
    const formCadastroProcesso = this.formService.getForm();

    if (formCadastroProcesso?.valid) {
      const novoCadastro = formCadastroProcesso.getRawValue() as Medida;
      this.medidasService.cadastrarMedida(novoCadastro).subscribe({
        next: () => {
          this.router.navigate(['/medidas/list']);
          alert('Medida Jurídica cadastrada com sucesso!')
        }
      });
    }
  }
}
