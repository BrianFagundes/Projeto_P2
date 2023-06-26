import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcadastroComponent } from './pcadastro.component';

describe('PcadastroComponent', () => {
  let component: PcadastroComponent;
  let fixture: ComponentFixture<PcadastroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PcadastroComponent]
    });
    fixture = TestBed.createComponent(PcadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
