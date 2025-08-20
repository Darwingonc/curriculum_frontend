import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

    public id: any;
    public identity: any;
    public experiencias: any;
    public educaciones: any;

  constructor(
      private usuarioServicio: UsuarioService,
  ) { }

  ngOnInit(): void {
      this.id = this.usuarioServicio.getIdFromLocalStorage();
      this.encontrarUsuario();
      this.encontrarExperiencias(this.id);
      this.encontrarEducaciones(this.id);
  }

    encontrarUsuario(): void {
        this.usuarioServicio.encontrar_perfil().subscribe({
            next: (query: any) => {
                if (query.ok) {
                    this.identity = query.data;
                } else {
                    alert('Ocurrió un error al busacr el perfil');
                }
            },
            error: (err) => {
                console.error('Error al obtener perfil', err);
                //alert('Error en el servidor');
            }
        });
    }

    async encontrarExperiencias(id) {
        const data = {
            id_perfil: id,
        };
        this.usuarioServicio.encontrar_experiencias(data).then((query: any) => {
            if (query.ok){
                this.experiencias = query.data;
                console.log(this.experiencias);
            } else{
                alert('ocurrio un error');
            }
        });
    }

    async encontrarEducaciones(id) {
        const data = {
            id_perfil: id,
        };
        this.usuarioServicio.encontrar_educaciones(data).then((query: any) => {
            if (query.ok){
                this.educaciones = query.data;
                console.log(this.educaciones);
            } else{
                alert('ocurrio un error');
            }
        });
    }

}
