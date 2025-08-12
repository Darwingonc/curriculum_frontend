import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterStyleTwoComponent } from './footer-style-two/footer-style-two.component';
import { NavbarStyleThreeComponent } from './navbar-style-three/navbar-style-three.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { RouterModule } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HabilidadesComponent } from './habilidades/habilidades.component';
import { DescripcionGeneralComponent } from './descripcion-general/descripcion-general.component';

@NgModule({
    declarations: [
        FooterStyleTwoComponent,
        NavbarStyleThreeComponent,
        PreloaderComponent,
        PrincipalComponent,
        ExperienciaComponent,
        PerfilComponent,
        HabilidadesComponent,
        DescripcionGeneralComponent,
    ],
    exports: [
        PreloaderComponent,
        NavbarStyleThreeComponent,
        FooterStyleTwoComponent,
        PrincipalComponent,
        PerfilComponent,
        HabilidadesComponent,
        DescripcionGeneralComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class CommonModuleModule { }
