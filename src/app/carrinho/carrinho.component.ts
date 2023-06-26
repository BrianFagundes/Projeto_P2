import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';


interface Cesta {
  id?: number;
  idCliente: number;
  idProduto: number;  
}

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  isLoggedIn: boolean = false;
  loggedInUser: string = '';
  carrinhoCount: number = 0;
  livrosCarrinho: any[] = [];
  livroInput: string = '';
  email: string = '';
  processingText: string = '';
  exibirProcessamento: boolean = false;
  isMenuExpanded: boolean = false;

  constructor(private router: Router, private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    // Verifique se o usuário está logado e atualize as propriedades isLoggedIn, loggedInUser e carrinhoCount de acordo
    this.isLoggedIn = this.authService.isLoggedInUser();
    this.loggedInUser = this.authService.getLoggedInUser() || '';
    this.carrinhoCount = this.authService.getCarrinhoCount();
    this.livrosCarrinho = this.authService.getLivrosCarrinho();
    this.authService.resetAutoLogoutTimer();    
  }

  redirectToPesquisa() {
    
    this.router.navigate(['/pesquisa', this.livroInput]);
  }

  getEmailPrefix(email: string) {
    this.email = email;
    return email.substring(0, email.indexOf('@'));
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async finalizarCompra() {
    var total = 0;
    
    if(this.email !=="")
    {
      for (let livro of this.livrosCarrinho) {
        this.exibirProcessamento = true;
        await this.delay(100);
        total += livro.valor;
      }
      if(total >0.005){
        this.sendEmail();         
      }
      else
        alert("Para finalizar é necessário ter algo comprado!");
    }
    else
    {
      alert("É necessário estar logado no sistema")

  }    
  }

  async sendEmail() {
    var valido = false; 
    var mensagem = "Erro:";
    var IdCliente2 = "";

    var emailBody = "Senhor(a), tudo bem?";
    var total = 0;
    emailBody += "\n\n\n  Segue abaixo itens comprados:";
    for (let livro of this.livrosCarrinho) {
      emailBody += "\n-Livro: " + livro.nomeLivro;
    }
    emailBody += "\n\n\nPara que confirmemos o pagamento realize o pagamento via pix (Copia e cola): \n123456789";
    
    for (let livro of this.livrosCarrinho) {
      total += livro.valor;
    }
    emailBody += "\n\nValor: "+total.toString();
    emailBody += "\n\nAtenciosamente,";
    emailBody += "\nEquipeA2BR";
    emailBody += "\n\n\n\nNão responda este email. trata-se de um email automárico.";
    const emailData = {
      to: this.email, // Usando o valor fornecido na tela
      subject: 'Confirmação de dados',
      body: emailBody
    };   
    

    const email = this.email;
      const url = `http://localhost:8090/clientes/email/${email}`;              
      try {
        const response = await this.http.get(url).toPromise() as any;        
        if (response[0].senha !=="") {
          IdCliente2 = response[0].id;
        } else {
          mensagem += "\nO email não está cadastrado no banco de dados!";
        }
      } catch (error) {
        console.error(error);
        mensagem += "\nO email não está cadastrado no banco de dados!";
      }

      for (let livro of this.livrosCarrinho) {                      
        
        var DadosEnvio = {
          idCliente: IdCliente2,
          idProduto: livro.id
        };         

        await this.http.post('http://localhost:8090/cestas', DadosEnvio, { responseType: 'text' })
        .subscribe(
          (response: any) => {
          },
          (error: HttpErrorResponse) => {
            if (error.error && error.error.message) {
              alert('Erro ao Atualizar a cesta: ' + error.error.message);
            } else {
              alert('Erro ao Atualizar a cesta. Detalhes: ' + JSON.stringify(error));
            }            
          }
        ); 

    };

    await this.http.post('http://localhost:8090/enviar-email', emailData, { responseType: 'text' })
      .subscribe(
        (response: any) => {
          alert('E-mail enviado com sucesso!');
          this.exibirProcessamento = false;
          this.limparCarrinho();
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
  

  redirectToCadastro() {
    if (this.isLoggedIn) {
      const confirmed = confirm('Deseja deslogar do sistema?');
      if (confirmed) {
        this.authService.logout();
        this.isLoggedIn = false;
        this.loggedInUser = '';
        this.router.navigateByUrl('/');
      }
    } else {
      this.router.navigate(['/cadastro']);
    }
  }

  redirectToCarrinho() {
    this.router.navigate(['/carrinho']);
  }

  removerLivro(livro: any) {
    // Remova o livro do carrinho usando o serviço AuthService
    this.authService.removerLivroCarrinho(livro);
    this.livrosCarrinho = this.authService.getLivrosCarrinho();
    this.carrinhoCount = this.authService.getCarrinhoCount();
  }

  calcularTotal() {
    let total = 0;
    for (let livro of this.livrosCarrinho) {
      total += livro.valor;
    }
    return total;
  }

  limparCarrinho() {
    // Limpe o carrinho usando o serviço AuthService
    this.authService.limparCarrinho();
    this.livrosCarrinho = [];
    this.carrinhoCount = 0;
  }

  toggleMenu() {
    setTimeout(() => {
      this.isMenuExpanded = !this.isMenuExpanded;
    }, 100); // Aguarda 100ms antes de atualizar a propriedade
  }

}
