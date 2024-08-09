import { FormsService } from 'src/app/core/services/forms.service';
import { Component } from '@angular/core';
import { Medida } from 'src/app/core/types/medida';
import { MedidasService } from '../service/medidas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medidas-add',
  templateUrl: './medidas-add.component.html',
  styleUrls: ['./medidas-add.component.scss'],
})
export class MedidasAddComponent {
  tituloPagina = 'Nova Medida Jurídica';

  constructor(
    private formService: FormsService,
    private medidasService: MedidasService,
    private router: Router
  ) {}

  private getForm(): Medida {
    return this.formService.getForm()?.getRawValue() as Medida;
  }

  private emitSucessAlert(): void {
    alert('Medida Jurídica cadastrada com sucesso.');
  }

  inserir() {
    const form = this.getForm();

    this.medidasService.cadastrarMedida(form).subscribe({
      next: () => {
        this.emitSucessAlert();
        window.location.reload();
      },
    });
  }

  inserirEPermanecer() {
    const form = this.getForm();

    this.medidasService.cadastrarMedida(form).subscribe({
      next: () => {
        this.emitSucessAlert();
        // TODO: Chamar serviço ou método que recupera o registro criado e atualiza a URL para o registro criado
      },
    });
  }

  submeter() {
    const form = this.getForm();

    this.medidasService.cadastrarMedida(form).subscribe({
      next: () => {
        this.router.navigate(['/medidas/list']);
        this.emitSucessAlert();
      },
    });
  }
}
