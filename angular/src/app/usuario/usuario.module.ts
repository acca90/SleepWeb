import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioEdtComponent } from './usuario-edt/usuario-edt.component';

@NgModule({
  declarations: [UsuarioListComponent, UsuarioEdtComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule
  ]
})
export class UsuarioModule { }
