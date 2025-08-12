import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';

import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import { FaqComponent } from './faq/faq.component';
import { CommonModuleModule } from '../common/common-module.module';
import { HomeComponent } from './home/home.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ModificarPerfilComponent } from './modificar-perfil/modificar-perfil.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
      CurriculumComponent,
      IniciarSesionComponent,
      RegistroComponent,
      AboutComponent,
      ErrorComponent,
      FaqComponent,
      HomeComponent,
      ModificarPerfilComponent,
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        CommonModuleModule,
        NgbProgressbarModule,
        NgSelectModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class PagesModule { }
