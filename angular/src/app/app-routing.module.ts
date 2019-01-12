import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SandboxComponent } from './sandbox/sandbox.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioModule' },
    { path: 'sandbox', component: SandboxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
