import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SandboxComponent } from './sandbox/sandbox.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { GruposComponent } from './grupos/grupos.component';
import { PermissoesComponent } from './permissoes/permissoes.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'sandbox', component: SandboxComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'pacientes', component: PacientesComponent },
    { path: 'grupos', component: GruposComponent },
    { path: 'permissoes', component: PermissoesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
