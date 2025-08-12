import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';

/*import { AppComponent } from './app.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FooterStyleTwoComponent } from './components/common/footer-style-two/footer-style-two.component';
import { NavbarStyleThreeComponent} from './components/common/navbar-style-three/navbar-style-three.component';*/
import { AppComponent } from './app.component';
import { PagesModule } from './components/pages/pages.module';
import { CommonModuleModule} from './components/common/common-module.module';

@NgModule({
  declarations: [
    AppComponent,
    /*FooterStyleTwoComponent,
    NavbarStyleThreeComponent,
    FaqComponent,
    ErrorComponent,
    AboutComponent,*/
  ],
    imports: [
        PagesModule,
        CommonModuleModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        NgSelectModule,
        ArchwizardModule,
        CommonModuleModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
