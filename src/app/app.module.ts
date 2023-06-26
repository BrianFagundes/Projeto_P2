import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PcadastroComponent } from './pcadastro/pcadastro.component';
import { Pcadastro2Component } from './pcadastro2/pcadastro2.component';
import { PesquisaComponent } from './pesquisa/pesquisa.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { Pcadastro3Component } from './pcadastro3/pcadastro3.component';
import { OverlayComponent } from './overlay/overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PcadastroComponent,
    Pcadastro2Component,
    PesquisaComponent,
    DetalheComponent,
    CarrinhoComponent,
    Pcadastro3Component,
    OverlayComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule, 
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
