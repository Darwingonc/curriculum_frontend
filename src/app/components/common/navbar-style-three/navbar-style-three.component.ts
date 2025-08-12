import { Component, OnInit, DoCheck} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
/*import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';*/
import {environment} from 'src/environments/environment';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
/*import {TranslateService} from '@ngx-translate/core';*/
import {deserialize} from 'jsonapi-fractal';

/* Interfaces */
// import {Alert} from 'src/app/interfaces/alert';

/* Services */
import { UsuarioService } from '../../services/usuario-service';
// import {AlertsService} from 'src/app/services/alerts/alerts.service';

@Component({
  selector: 'app-navbar-style-three',
  templateUrl: './navbar-style-three.component.html',
  styleUrls: ['./navbar-style-three.component.scss']
})
export class NavbarStyleThreeComponent implements OnInit, DoCheck {

    public token: any;
    public identity: any;
    public id: any;

    public show = false;

    constructor(
        private usuarioServicio: UsuarioService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.checkUser();
    }

    ngDoCheck(): void {
        this.checkUser();
    }

    checkUser(): void {
        this.token = this.usuarioServicio.getTokenFromLocalStorage();
    }

    cerrarSesion(): void {
        localStorage.clear();
        this.token = null;
        this.id = null;
        this.router.navigate(['/iniciar-sesion']);
    }


}
