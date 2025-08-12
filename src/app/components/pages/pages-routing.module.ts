import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { ModificarPerfilComponent } from './modificar-perfil/modificar-perfil.component';
import {AuthGuard} from '../services/auth.guard';


const routes: Routes = [
    { path: '',
      children: [
          {path: '', canActivate: [AuthGuard], component: HomeComponent},
          {path: 'iniciar-sesion', canActivate: [], component: IniciarSesionComponent},
          {path: 'registro', component: RegistroComponent},
          {path: 'curriculum', canActivate: [AuthGuard], component: CurriculumComponent},
          {path: 'modificar-perfil', canActivate: [AuthGuard], component: ModificarPerfilComponent},
      ]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class PagesRoutingModule { }
