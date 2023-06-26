import { Component } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/Service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pcadastro3',
  templateUrl: './pcadastro3.component.html',
  styleUrls: ['./pcadastro3.component.css']
})
export class Pcadastro3Component {
  email: string = ''; // Variável para armazenar o valor do e-mail fornecido na tela
  isLoggedIn: boolean = false;
  loggedInUser: string = '';
  carrinhoCount: number = 0;
  livroInput: string = '';
  exibirProcessamento: boolean = false;
  isMenuExpanded: boolean = false;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedInUser();
    this.loggedInUser = this.authService.getLoggedInUser() || '';
  }

  ngOnInit()
  {
    this.carrinhoCount = this.authService.getCarrinhoCount();
    this.authService.resetAutoLogoutTimer();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async sendEmail() {
    var valido = false; 
    var mensagem = "Erro:";
    var Senha = "";

      const email = this.email;
      const url = `http://localhost:8090/clientes/email/${email}`;  
      this.exibirProcessamento = true;
      await this.delay(100);
      try {
        const response = await this.http.get(url).toPromise() as any;        
        if (response[0].senha !=="") {
          Senha = response[0].senha;
        } else {
          mensagem += "\nO email não está cadastrado no banco de dados!";
        }
      } catch (error) {
        console.error(error);
        mensagem += "\nO email não está cadastrado no banco de dados!";
      }
      
      if(mensagem==="Erro:"){
        valido = true;
      }
    
    if(valido)
    {
    const emailData = {
      to: this.email, // Usando o valor fornecido na tela
      subject: 'Recuperação de senha',
      body: 'A senha que foi gravada no sistema é: ' + Senha + '\n\n\n\nAtenciosamente, \nEquipe da A2BR \n\n\nEste e-mail é automatico, favor não responder'
    };

    this.http.post('http://localhost:8090/enviar-email', emailData, { responseType: 'text' })
      .subscribe(
        (response: any) => {
          alert('E-mail enviado com sucesso!');
          this.exibirProcessamento = false;
        },
        (error: HttpErrorResponse) => {

          if (error.error && error.error.message) {
            alert('Erro ao enviar e-mail: ' + error.error.message);
          } else {
            alert('Erro ao enviar e-mail. Detalhes: ' + JSON.stringify(error));
          }
          this.exibirProcessamento = false;
        }
      );
    }
    else
    {
      alert(mensagem);
    }
    
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

  redirectToHome() {
    this.router.navigate(['/']);
  }

  toggleMenu() {
    setTimeout(() => {
      this.isMenuExpanded = !this.isMenuExpanded;
    }, 100); // Aguarda 100ms antes de atualizar a propriedade
  }
}
