import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pcadastro',
  templateUrl: './pcadastro.component.html',
  styleUrls: ['./pcadastro.component.css']
})
export class PcadastroComponent {
  emailInput: string = '';
  senhaInput: string = '';
  isLoggedIn: boolean = false;
  loggedInUser: string = '';
  carrinhoCount: number = 0;
  livroInput: string = '';
  isMenuExpanded: boolean = false;

  constructor(private router: Router, private authService: AuthService, private http: HttpClient) {
    this.isLoggedIn = this.authService.isLoggedInUser();
    this.loggedInUser = this.authService.getLoggedInUser() || '';
  }

  redirectToHome2() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
    this.carrinhoCount = this.authService.getCarrinhoCount();
    this.authService.resetAutoLogoutTimer();
  }

  async redirectToHome() {
    const emailInput = this.emailInput;
    const senhaInput = this.senhaInput;

    if (emailInput !== '' && senhaInput !== '') {
      if (this.authService.isLoggedInUser()) {
        alert('Usuário já está logado!');
        this.router.navigate(['/']);
        return;
      }

      var Senha = '';

      const url = `http://localhost:8090/clientes/email/${emailInput}`;

      try {
        const response = await this.http.get(url).toPromise() as any;
        if (response[0].senha !== '') {
          Senha = response[0].senha;
          if (Senha.toString() === senhaInput.toString()) {
            this.authService.login(emailInput.toString()); // Faz o login usando o serviço de autenticação
            alert('Login realizado com sucesso!');            
            this.router.navigate(['/']);
          } else {
            alert('Acesso negado, usuário ou senha inválido!');
          }
        } else {
          alert('Acesso negado, usuário ou senha inválido!');
        }
      } catch (error) {
        console.error(error);
        alert('Acesso negado, usuário ou senha inválido!');
      }
    }
  }

  redirectToCadastro2() {
    this.router.navigate(['/cadastro2']);
  }

  redirectToCadastro3() {
    this.router.navigate(['/pcadastro3']);
  }

  redirectToPesquisa() {
    this.router.navigate(['/pesquisa', this.livroInput]);
  }

  getEmailPrefix(email: string): string {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.substring(0, atIndex);
    }
    return email;
  }

  redirectToCarrinho() {
    this.router.navigate(['/carrinho']);
  }

  redirectToCadastro() {
    if (this.isLoggedIn) {
      const confirmed = confirm('Deseja deslogar do sistema?');
      if (confirmed) {
        this.authService.logout();
        this.isLoggedIn = false;
        this.loggedInUser = '';
        // Redirecionar para a tela de login, se desejado
        this.router.navigateByUrl('/');
      }
    } else {
      this.router.navigateByUrl('/cadastro');
    }
  }

  toggleMenu() {
    setTimeout(() => {
      this.isMenuExpanded = !this.isMenuExpanded;
    }, 100); // Aguarda 100ms antes de atualizar a propriedade
  }
}
