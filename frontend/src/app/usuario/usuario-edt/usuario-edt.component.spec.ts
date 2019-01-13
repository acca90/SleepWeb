import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEdtComponent } from './usuario-edt.component';

describe('UsuarioEdtComponent', () => {
  let component: UsuarioEdtComponent;
  let fixture: ComponentFixture<UsuarioEdtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioEdtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioEdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
