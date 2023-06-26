import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pcadastro2Component } from './pcadastro2.component';



describe('Pcadastro2Component', () => {
  let component: Pcadastro2Component;
  let fixture: ComponentFixture<Pcadastro2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Pcadastro2Component]
    });
    fixture = TestBed.createComponent(Pcadastro2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
