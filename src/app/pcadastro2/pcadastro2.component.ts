import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

interface Usuario {
  id?: number;
  nomeCompleto: string;
  email: string;
  senha: string;
  enderecoEntrega: string;
  cidade: string;
  estado: string;
}

@Component({
  selector: 'app-pcadastro2',
  templateUrl: './pcadastro2.component.html',
  styleUrls: ['./pcadastro2.component.css']
})
export class Pcadastro2Component {
  usuarioForm: FormGroup;
  isLoggedIn: boolean = false;
  loggedInUser: string = '';
  carrinhoCount: number = 0;
  livroInput: string = '';
  isMenuExpanded: boolean = false;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
    this.usuarioForm = new FormGroup({
      nomeCompleto: new FormControl('', ),
      email: new FormControl('', ),
      senha: new FormControl('', ),
      confirmacaoSenha: new FormControl('', ),
      enderecoEntrega: new FormControl('', ),
      cidade: new FormControl('', ),
      estado: new FormControl('', )
    });
    this.isLoggedIn = this.authService.isLoggedInUser();
    this.loggedInUser = this.authService.getLoggedInUser() || '';
  }

  ngOnInit()
  {
    this.carrinhoCount = this.authService.getCarrinhoCount();
    this.authService.resetAutoLogoutTimer();
  }

  async salvarUsuario() { // Alterado para função assíncrona
    var valido = false;
    var mensagem = "Erro:";
    if (this.usuarioForm.valid) {
      if(this.usuarioForm.value.senha !== this.usuarioForm.value.confirmacaoSenha){
        mensagem += "\nSenha e Confirmação de senha diferentes, favor ajustar!";
      }

      if (!/[A-Z]/.test(this.usuarioForm.value.senha)) {
        mensagem += "\nSenha Deve ter no mínimo 1 caractere maiusculo";
      }
    
      // Verificar se contém pelo menos um caractere especial
      if (!/[\W_]/.test(this.usuarioForm.value.senha)) {
        mensagem += "\nSenha Deve ter no mínimo 1 caractere especial";
      }

      // Verificar se contém pelo menos um caractere numérico
      if (!/[0-9]/.test(this.usuarioForm.value.senha)) {
        mensagem += "\nSenha Deve ter no mínimo 1 caractere numérico";
      }
    
      // Verificar se contém pelo menos um caractere minúsculo
      if (!/[a-z]/.test(this.usuarioForm.value.senha)) {
        mensagem += "\nSenha Deve ter no mínimo 1 caractere minusculo";
      }
    
      // Verificar se tem mais de 8 dígitos
      if (this.usuarioForm.value.senha.length < 8) {
        mensagem += "\nSenha Deve ter no mínimo 8 caracteres";
      }

      // Verificar se o campo email é um email mesmo 
      var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!regex.test(this.usuarioForm.value.email))
      {
        mensagem += "\nCampo email não tem um email valido. Exemplo: abc@teste.com ";
      }

      const email = this.usuarioForm.value.email;
      const url = `http://localhost:8090/clientes/email/${email}`;      
      try 
      {
        const response = await this.http.get(url).toPromise() as HttpResponse<any>;
        if (Array.isArray(response) && response.length > 0) {
          mensagem += "\nO email já está cadastrado no banco de dados!";
        }
      } catch (error) {
        console.error(error);
        mensagem += "\nErro ao verificar o email no banco de dados!";
      }
      
      if(mensagem==="Erro:"){
        valido = true;
      }

      if(valido){
        const usuario: Usuario = this.usuarioForm.value;
        this.cadastrarCliente(usuario);
      }
      else{
        alert(mensagem);
      }
    } else {      
      alert('Preencha corretamente todos os campos!');      
    }
  }

  cadastrarCliente(usuario: Usuario) {    
    this.http.post('http://localhost:8090/clientes', usuario).subscribe(
      () => {
        alert('Usuário cadastrado com sucesso!');
      },
      error => {
        alert('Erro ao cadastrar usuário!');
        console.log('Erro ao cadastrar usuário:', error);
      }
    );

    
  }

  redirectToHome() {
    this.router.navigate(['/']);
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
