import { TokenComponent } from './pages/login/recuperar/token/token.component';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';
import { Not404Component } from './pages/not404/not404.component';
import { Not403Component } from './pages/not403/not403.component';
import { GuardService } from './_service/guard.service';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/login/registro/registro.component';
import { EstudianteComponent } from './pages/estudiante/estudiante.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DocenteComponent } from './pages/docente/docente.component';
import { AdministrarCursosComponent } from './pages/administrador/administrar-cursos/administrar-cursos.component';


const routes: Routes = [
  
  /*
  {
    path: 'estudiante', component: EstudianteComponent, children: [
     // { path: 'nuevo', component: PacienteEdicionComponent },
     // { path: 'edicion/:id', component: PacienteEdicionComponent }
    ], canActivate: [GuardService]
  },
  */
  {path: 'estudiante', component: EstudianteComponent, canActivate: [GuardService]},
  {path: 'docente', component: DocenteComponent, canActivate: [GuardService]},
  {path: 'administrar-cursos', component: AdministrarCursosComponent, canActivate: [GuardService]},
  { path: 'not-403', component: Not403Component },
  { path: 'not-404', component: Not404Component },
  { path: 'login', component: LoginComponent},
 
  {path: 'registro', component: RegistroComponent},

  {
    path: 'recuperar', component: RecuperarComponent, children: [
      { path: ':token', component: TokenComponent }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
