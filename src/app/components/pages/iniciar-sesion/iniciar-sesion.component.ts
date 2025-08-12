import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/usuario-service';
import {RouterModule, Router} from '@angular/router';
import {any} from 'codelyzer/util/function';
import {deserialize, serialize} from 'jsonapi-fractal';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {

  constructor(
      private userService: UsuarioService,
      private router: Router,
  ) { }

    public id: any;
    public token;
    public identity: any;
    public res: any;

    formLogin = new FormGroup({
        correo: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });

  ngOnInit(): void {
  }

  submitForm(form): void {
      const data = {
          correo: form.correo,
          password: form.password,
      };
      this.userService.iniciarSesion(data).then((query: any) => {
          if (query.ok){
              console.log(query);
              this.token = query.token;
              this.id = query.data.id;
              localStorage.setItem('token', this.token);
              localStorage.setItem('id', this.id);
              this.router.navigate(['modificar-perfil']);
          } else{
              alert('los datos estan mal');
              console.log('datos malos');
          }
      }
      );
  }

  registrarse(){
      this.router.navigate(['registro']);
  }

}
