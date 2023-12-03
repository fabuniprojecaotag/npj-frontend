import { Component } from '@angular/core';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
  tituloPagina = 'Meu Perfil';

  token = '';

  constructor(private tokenService: TokenService, private cadastroService: CadastroService) {}


  atualizarUsuario() {
    alert('usuário atualizado (so testando a chamada da função)');
  }
}
