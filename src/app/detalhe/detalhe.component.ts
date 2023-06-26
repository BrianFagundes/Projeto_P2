import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {
  isLoggedIn: boolean = false;
  loggedInUser: string = '';
  carrinhoCount: number = 0;
  livroDetalhe: any;
  imagePath = '../assets/Imagens/Produtos/';
  livroInput: string = '';
  isMenuExpanded: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];

      // Fazer a requisição GET à API para obter os dados do produto
      this.http.get(`http://localhost:8090/produtos/${id}`).subscribe((data: any) => {
        this.livroDetalhe = data;
        this.livroDetalhe.imagem = this.constructImagePath(id);
      });
    });

    this.isLoggedIn = this.authService.isLoggedInUser();
    this.loggedInUser = this.authService.getLoggedInUser() ?? '';
    this.carrinhoCount = this.authService.getCarrinhoCount();
    this.authService.resetAutoLogoutTimer();
  }

  constructImagePath(id: number): string {
    return `${this.imagePath}${id}.jpg`;
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  redirectToPesquisa() {
    
    this.router.navigate(['/pesquisa', this.livroInput]);
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

  getEmailPrefix(email: string) {
    return email.substring(0, email.indexOf('@'));
  }

  adicionarAoCarrinho() {
    if (this.authService.isLoggedInUser()) {
      this.authService.adicionarAoCarrinho(this.livroDetalhe);
      this.carrinhoCount = this.authService.getCarrinhoCount();
    } else {
      alert("Para fazer qualquer compra é necessário estar logado no sistema!")
    }
  }
  
  toggleMenu() {
    setTimeout(() => {
      this.isMenuExpanded = !this.isMenuExpanded;
    }, 100); // Aguarda 100ms antes de atualizar a propriedade
  }  
}
