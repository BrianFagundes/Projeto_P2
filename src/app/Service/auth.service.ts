import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'isLoggedIn';
  private loggedInUserKey = 'loggedInUser';
  private carrinhoCountKey = 'carrinhoCount';
  private carrinhoKey = 'carrinho';
  private timeoutId?: ReturnType<typeof setTimeout>;
  private ControleProcessando = 'ControleProcessando';
  logoffEvent = new Subject<void>();

  constructor(private router: Router) {}

  SetaProcessando()
  {
    localStorage.setItem(this.ControleProcessando, 'true');    
  }

  RessetaProcessando()
  {
    localStorage.setItem(this.ControleProcessando, 'false');    
  }

  login(email: string) {
    localStorage.setItem(this.storageKey, 'true');
    localStorage.setItem(this.loggedInUserKey, email);
    this.startAutoLogoutTimer();
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.loggedInUserKey);
    localStorage.removeItem(this.carrinhoCountKey);
    localStorage.removeItem(this.carrinhoKey);
  }

  getProcessando() : boolean  {
    return localStorage.getItem(this.ControleProcessando) === 'true';
  }

  isLoggedInUser(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }

  getLoggedInUser(): string | null {
    return localStorage.getItem(this.loggedInUserKey);
  }

  getCarrinhoCount(): number {
    const count = localStorage.getItem(this.carrinhoCountKey);
    return count ? parseInt(count, 10) : 0;
  }

  getCarrinho(): any[] {
    const carrinhoJson = localStorage.getItem(this.carrinhoKey);
    return carrinhoJson ? JSON.parse(carrinhoJson) : [];
  }

  adicionarAoCarrinho(livro: any) {
    const count = this.getCarrinhoCount();
    localStorage.setItem(this.carrinhoCountKey, (count + 1).toString());

    const carrinho = this.getCarrinho();
    carrinho.push(livro);
    localStorage.setItem(this.carrinhoKey, JSON.stringify(carrinho));
  }

  removerLivroCarrinho(livro: any) {
    const livrosCarrinho = this.getCarrinho();
    const count = this.getCarrinhoCount();

    const index = livrosCarrinho.findIndex((livroCarrinho: any) => livroCarrinho.id === livro.id);
    if (index !== -1) {
      livrosCarrinho.splice(index, 1);
      localStorage.setItem(this.carrinhoKey, JSON.stringify(livrosCarrinho));
      localStorage.setItem(this.carrinhoCountKey, (count - 1).toString());
    }
  }

  limparCarrinho() {
    localStorage.removeItem(this.carrinhoCountKey);
    localStorage.removeItem(this.carrinhoKey);
  }

  getLivrosCarrinho(): any[] {
    const livrosJson = localStorage.getItem(this.carrinhoKey);
    return livrosJson ? JSON.parse(livrosJson) : [];
  }

  startAutoLogoutTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {    
      if(this.isLoggedInUser())  
      {
        this.logout();
        alert("Usuário deslogado por inatividade!");
        this.router.navigateByUrl('/cadastro');
        this.logoffEvent.next();    
      }
    }, 60000);
  }

  resetAutoLogoutTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.startAutoLogoutTimer();
    }
  }
}
