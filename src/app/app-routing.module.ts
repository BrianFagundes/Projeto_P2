import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PcadastroComponent } from './pcadastro/pcadastro.component';
import { Pcadastro2Component } from './pcadastro2/pcadastro2.component';
import { Pcadastro3Component } from './pcadastro3/pcadastro3.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'cadastro', component: PcadastroComponent},
  {path: 'home', component: HomeComponent},
  {path: 'cadastro2', component:Pcadastro2Component},
  {path: 'pesquisa/:livroInput', component: PesquisaComponent},
  {path: 'detalhe/:id', component: DetalheComponent},
  {path: 'pcadastro3', component: Pcadastro3Component},
  {path: 'carrinho', component: CarrinhoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
