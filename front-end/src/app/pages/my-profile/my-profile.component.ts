import { Component } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
  tituloPagina = 'Meu Perfil';

  atualizarUsuario() {
    alert('usuário atualizado (so testando a chamada da função)');
  }
}
