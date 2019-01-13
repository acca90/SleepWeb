import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioEdtComponent } from './usuario-edt/usuario-edt.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';

const routes: Routes = [
    { path: 'list', component: UsuarioListComponent },
    { path: 'edt', component: UsuarioEdtComponent },
    { path: '', redirectTo: 'list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
