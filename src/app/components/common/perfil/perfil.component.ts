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
      this.encontrarUsuario(this.id);
      this.encontrarExperiencias(this.id);
      this.encontrarEducaciones(this.id);
  }

    async encontrarUsuario(id) {
        const data = {
            id: id,
        };
        this.usuarioServicio.encontrar_perfil(data).then((query: any) => {
            if (query.ok){
                this.identity = query.data;
                console.log(this.identity);
            } else{
                alert('ocurrio un error');
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
