import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/usuario-service';
import { Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MensajeService} from '../../services/mensaje.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {

    constructor(
      private userService: UsuarioService,
      private router: Router,
      private mensajeService: MensajeService,
) {}

    public id: any;
    public token;
    public identity: any;

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
      this.userService.iniciarSesion(data).subscribe({
          next: (res: any) => {
              if (res.ok) {
                  // Login exitoso
                  localStorage.setItem('token', res.token);
                  localStorage.setItem('id', res.data.id);
                  this.router.navigate(['modificar-perfil']);
              }
          },
          error: (err: any) => {
          }
      });
  }

  registrarse(){
      this.router.navigate(['registro']);
  }

}
