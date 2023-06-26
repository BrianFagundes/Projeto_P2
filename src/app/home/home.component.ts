import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { HttpClient } from '@angular/common/http';
// import { CarouselConfig } from 'ngx-bootstrap/carousel';

interface Slide {
  image: string;
  alt: string;
  caption: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  // providers: [
  //   { provide: CarouselConfig, useValue: { interval: 5000, noPause: true, showIndicators: true } }
  // ]
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  loggedInUser = '';
  products: any[] = [];
  sortedProducts: any[] = [];
  imagePath = '../assets/Imagens/Produtos/';
  currentOption = '';
  status = false;
  carrinhoCount: number = 0;
  livroInput: string = '';
  isMenuExpanded: boolean = false;

  slides: Slide[] = [
    { image: '../../assets/Imagens/1.png', alt: 'Jogos Vorazes', caption: 'Jogos Vorazes' },
    { image: '../../assets/Imagens/2.png', alt: 'Harry Potter', caption: 'Harry Potter' },
    { image: '../../assets/Imagens/3.png', alt: 'Senhor dos Anéis', caption: 'Senhor dos Anéis' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedInUser();
    this.loggedInUser = this.authService.getLoggedInUser() || '';
    this.loadProducts();
    this.carrinhoCount = this.authService.getCarrinhoCount();
    this.authService.resetAutoLogoutTimer();
  }
  

  loadProducts() {
    this.http.get<any[]>('http://localhost:8090/produtos').subscribe(
      (response) => {
        this.products = response.map((produto) => {
          return { ...produto, imagem: this.constructImagePath(produto.id) };
        });
        this.sortedProducts = [...this.products];
      },
      (error) => {
        console.log('Erro ao obter produtos:', error);
      }
    );
  }

  constructImagePath(id: number): string {
    return `${this.imagePath}${id}.jpg`;
  }

  getEmailPrefix(email: string): string {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.substring(0, atIndex);
    }
    return email;
  }

  sortProducts(event: any) {
    this.currentOption = event.target.value;

    if (this.currentOption === '1') {
      this.products.sort((a, b) => a.nomeLivro.localeCompare(b.nomeLivro));
      this.sortedProducts = [...this.products];
    } else if (this.currentOption === '2') {
      this.products.sort((a, b) => b.nomeLivro.localeCompare(a.nomeLivro));
      this.sortedProducts = [...this.products];
    } else {
      this.products.sort((a, b) => a.id - b.id);
      this.sortedProducts = [...this.products];
    }
    this.router.navigate(['/home']);
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
      this.router.navigateByUrl('/cadastro');
    }
  }

  redirectToHome() {
    this.router.navigateByUrl('/home');
  }

  redirectToPesquisa2()
  {
    this.router.navigate(['/pesquisa', "Harry Potter"]);
  }

  redirectToPesquisa() {
    
    this.router.navigate(['/pesquisa', this.livroInput]);
  }

  redirectToDetalhe(id: number) {
    this.router.navigate(['/detalhe', id]);
  }

  redirectToCarrinho() {
    this.router.navigate(['/carrinho']);
  }

  toggleMenu() {
    setTimeout(() => {
      this.isMenuExpanded = !this.isMenuExpanded;
    }, 100); // Aguarda 100ms antes de atualizar a propriedade
  }
}
