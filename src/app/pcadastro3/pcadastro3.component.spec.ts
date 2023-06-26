import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pcadastro3Component } from './pcadastro3.component';

describe('Pcadastro3Component', () => {
  let component: Pcadastro3Component;
  let fixture: ComponentFixture<Pcadastro3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Pcadastro3Component]
    });
    fixture = TestBed.createComponent(Pcadastro3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
