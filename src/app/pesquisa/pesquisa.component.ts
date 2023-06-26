import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent {
  isLoggedIn: boolean = false;
  loggedInUser: string = '';
  carrinhoCount: number = 0;
  products: any[] = [];
  imagePath = '../assets/Imagens/Produtos/';
  livroInput: string = '';
  isMenuExpanded: boolean = false; // Propriedade para controlar a expansão do menu

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.isLoggedIn = this.authService.isLoggedInUser();
    this.loggedInUser = this.authService.getLoggedInUser() || '';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const nomeLivro = params['livroInput'];
      const url = `http://localhost:8090/produtos/nome/${nomeLivro}`;
      this.http.get<any[]>(url).subscribe(
        (response) => {
          this.products = response.map((produto) => {
            return { ...produto, imagem: this.constructImagePath(produto.id) };
          });
        },
        (error) => {
          console.log('Erro ao obter produtos:', error);
        }
      );
    });

    this.isLoggedIn = this.authService.isLoggedInUser();
    this.loggedInUser = this.authService.getLoggedInUser() ?? '';
    this.carrinhoCount = this.authService.getCarrinhoCount();
    this.authService.resetAutoLogoutTimer();
  }

  constructImagePath(id: number): string {
    return `${this.imagePath}${id}.jpg`;
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

  redirectToDetalhe(id: number) {
    this.router.navigate(['/detalhe', id]);
  }

  toggleMenu() {
    setTimeout(() => {
      this.isMenuExpanded = !this.isMenuExpanded;
    }, 100); // Aguarda 100ms antes de atualizar a propriedade
  }
}
