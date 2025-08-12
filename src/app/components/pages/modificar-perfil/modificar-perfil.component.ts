import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.scss']
})
export class ModificarPerfilComponent implements OnInit {

    public token: any;
    public id: any;
    public identity: any;
    public habilidad: any;
    public educacion: any;
    public experiencias: any;
    public data: any;


  constructor(
      private usuarioServicio: UsuarioService,
      private router: Router,
  ) {
  }



  ngOnInit(): void {
      this.token = this.usuarioServicio.getTokenFromLocalStorage();
      this.id = this.usuarioServicio.getIdFromLocalStorage();
      this.encontrarUsuario(this.id);
      this.encontrarEducaciones(this.id);
      this.encontrarHabilidades(this.id);
      this.encontrarExperiencias(this.id);
  }


    informacionBasica = new FormGroup({
        /*información básica*/
        nombre: new FormControl('', Validators.required),
        apellido: new FormControl('', Validators.required ),
        telefono: new FormControl('', Validators.required ),
        correo: new FormControl('', Validators.required ),
        nacimiento: new FormControl('', Validators.required),
        genero: new FormControl('', Validators.required),
        nacionalidad: new FormControl('', Validators.required),
        ocupacion: new FormControl('', Validators.required),
        descripcion: new FormControl('', Validators.required),
        pais: new FormControl('', Validators.required),
        estado: new FormControl('' , Validators.required),
        ciudad: new FormControl('', Validators.required),
    });

    private inicializarInformacion(identity): void {
        this.informacionBasica.patchValue({
            apellido: identity.apellido,
            nombre: identity.nombre,
            telefono: identity.telefono,
            correo: identity.correo,
            nacimiento: identity.nacimiento,
            genero: identity.genero,
            nacionalidad: identity.nacionalidad,
            ocupacion: identity.ocupacion,
            descripcion: identity.descripcion,
            pais: identity.pais,
            estado: identity.estado,
            ciudad: identity.ciudad,
        });
    }

    async encontrarUsuario(form) {
        const data = {
            id: form,
        };
        this.usuarioServicio.encontrar_perfil(data).then((query: any) => {
            if (query.ok){
                this.identity = query.data;
                this.inicializarInformacion(this.identity);
            } else{
                alert('ocurrio un error');
            }
        });
    }

    async actualizarInformacionBasica(form){
        const data = {
            id: this.id,
            apellido: form.apellido,
            nombre: form.nombre,
            telefono: form.telefono,
            correo: form.correo,
            nacimiento: form.nacimiento,
            genero: form.genero,
            nacionalidad: form.nacionalidad,
            ocupacion: form.ocupacion,
            descripcion: form.descripcion,
            pais: form.pais,
            estado: form.estado,
            ciudad: form.ciudad,
        };
        this.usuarioServicio.actualizar_perfil(this.token, data).subscribe(
            res => {
                    window.location.reload();
        }, error => {
                alert('token no valido');
            });
    }


    //experiencias de trabajo

    experienciaTrabajo = new FormGroup({
        /*información de la experiencia de trabajo*/
        nombre_trabajo: new FormControl('', Validators.required),
        descripcion: new FormControl('', Validators.required ),
        lugar: new FormControl('', Validators.required ),
        pais: new FormControl('', Validators.required ),
        estado: new FormControl('', Validators.required),
        ciudad: new FormControl('', Validators.required),
        fecha_inicio: new FormControl('', Validators.required),
        fecha_final: new FormControl('', Validators.required),
    });

    async encontrarExperiencias(form) {
        const data = {
            id_perfil: form,
        };
        this.usuarioServicio.encontrar_experiencias(data).then((query: any) => {
            if (query.ok){
                this.experiencias = query.data;
            } else{
                alert('ocurrio un error');
            }
        });
    }

    async actualizarExperiencias(form){
        const data = {
            id: form.id,
            id_perfil: this.id,
            nombre_trabajo: form.nombre_trabajo,
            descripcion: form.descripcion,
            lugar: form.lugar,
            pais: form.pais,
            estado: form.estado,
            ciudad: form.ciudad,
            fecha_inicio: form.fecha_inicio,
            fecha_final: form.fecha_final

        };
        this.usuarioServicio.actualizar_experiencia(this.token, data).subscribe(
            res => {
                window.location.reload();
                this.router.navigate(['v-pills-profesional-tab'] );
            }, error => {
                alert('token no valido');
            });
    }

    async crearExperiencias(form){
        const data = {
            id_perfil: this.id,
            nombre_trabajo: form.nombre_trabajo,
            descripcion: form.descripcion,
            lugar: form.lugar,
            pais: form.pais,
            estado: form.estado,
            ciudad: form.ciudad,
            fecha_inicio: form.fecha_inicio,
            fecha_final: form.fecha_final

        };
        this.usuarioServicio.crear_experienia(this.token, data).subscribe(
            res => {
                this.encontrarExperiencias(this.id);
            }, error => {
                alert('token no valido');
            });
    }

    async eliminarExperiencia(form){
        if (confirm('Seguro que desea eliminar la experiencia de trabajo')){
            const data = {
                id: form.id,
                id_perfil: this.id,
                nombre_trabajo: form.nombre_trabajo,
                descripcion: form.descripcion,
                lugar: form.lugar,
                pais: form.pais,
                estado: form.estado,
                ciudad: form.ciudad,
                fecha_inicio: form.fecha_inicio,
                fecha_final: form.fecha_final
            };
            this.usuarioServicio.eliminar_experiencia(this.token, data).subscribe(
                res => {
                    this.encontrarExperiencias(this.id);
                }, error => {
                    alert('token no valido');
                });
        }
    }

    //educaciones

    educaciones = new FormGroup({
        /*información de la experiencia de trabajo*/
        nombre_escuela: new FormControl('', Validators.required),
        nivel: new FormControl('', Validators.required ),
        descripcion: new FormControl('', Validators.required ),
        pais: new FormControl('', Validators.required ),
        estado: new FormControl('', Validators.required),
        ciudad: new FormControl('', Validators.required),
        fecha_inicio: new FormControl('', Validators.required),
        fecha_final: new FormControl('', Validators.required),
    });


    async encontrarEducaciones(form) {
        const data = {
            id_perfil: form,
        };
        this.usuarioServicio.encontrar_educaciones(data).then((query: any) => {
            if (query.ok){
                this.educacion = query.data;
            } else{
                alert('ocurrio un error');
            }
        });
    }

    async crearEducaciones(form){
        const data = {
            id_perfil: this.id,
            nombre_escuela: form.nombre_escuela,
            nivel: form.nivel,
            descripcion: form.descripcion,
            pais: form.pais,
            estado: form.estado,
            ciudad: form.ciudad,
            fecha_inicio: form.fecha_inicio,
            fecha_final: form.fecha_final
        };
        this.usuarioServicio.crear_educacion(this.token, data).subscribe(
            res => {
                this.encontrarEducaciones(this.id);
            }, error => {
                alert('token no valido');
            });
    }

    async actualizarEducaciones(form){
        const data = {
            id: form.id,
            id_perfil: this.id,
            nombre_escuela: form.nombre_escuela,
            nivel: form.nivel,
            descripcion: form.descripcion,
            pais: form.pais,
            estado: form.estado,
            ciudad: form.ciudad,
            fecha_inicio: form.fecha_inicio,
            fecha_final: form.fecha_final

        };
        this.usuarioServicio.actualizar_educacion(this.token, data).subscribe(
            res => {
                window.location.reload();
            }, error => {
                alert('token no valido');
            });
    }

    async eliminarEducacion(form){
        if (confirm('Seguro que desea eliminar la educación')){
            const data = {
                id: form.id,
                id_perfil: this.id,
                nombre_escuela: form.nombre_escuela,
                nivel: form.nivel,
                descripcion: form.descripcion,
                pais: form.pais,
                estado: form.estado,
                ciudad: form.ciudad,
                fecha_inicio: form.fecha_inicio,
                fecha_final: form.fecha_final

            };
            this.usuarioServicio.eliminar_educacion(this.token, data).subscribe(
                res => {
                    this.encontrarEducaciones(this.id);
                }, error => {
                    alert('token no valido');
                });
        }
    }

    //habilidades

    habilidades = new FormGroup({
        /*información de la experiencia de trabajo*/
        nombre_habilidades: new FormControl('', Validators.required),
        porcentage: new FormControl('', Validators.required ),
    });

    async encontrarHabilidades(form) {
        const data = {
            id_perfil: form,
        };
        this.usuarioServicio.encontrar_habilidad(data).then((query: any) => {
            if (query.ok){
                this.habilidad = query.data;
                /*this.inicializarHabilidades(this.habilidad);*/
            } else{
                alert('ocurrio un error');
            }
        });
    }

    async actualizarHabilidades(form) {
        const data = {
            id: form.id,
            id_perfil: this.id,
            nombre_habilidades: form.nombre_habilidades,
            porcentage: form.porcentage
        };
        this.usuarioServicio.actualizar_habilidad(this.token, data).subscribe(
            res => {
                window.location.reload();
            }, error => {
                alert('token no valido');
            });
    }

    async eliminarHabilidad(form){
        if (confirm('Seguro que desea eliminar la habilidad')){
            const data = {
                id: form.id,
                id_perfil: this.id,
                nombre_habilidades: form.nombre_habilidades,
                porcentage: form.porcentage
            };
            this.usuarioServicio.eliminar_habilidad(this.token, data).subscribe(
                res => {
                    this.encontrarHabilidades(this.id);
                }, error => {
                    alert('token no valido');
                });
        }
    }

    async crearHabilidades(form) {
        const data = {
            id_perfil: this.id,
            nombre_habilidades: form.nombre_habilidades,
            porcentage: form.porcentage
        };
        this.usuarioServicio.crear_habilidad(this.token, data).subscribe(
            res => {
                this.habilidad.push(res.data);
                // this.encontrarHabilidades(this.id);
            }, error => {
                alert('token no valido');
            });
    }



}
