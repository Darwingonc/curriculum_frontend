import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-descripcion-general',
  templateUrl: './descripcion-general.component.html',
  styleUrls: ['./descripcion-general.component.scss']
})
export class DescripcionGeneralComponent implements OnInit {

    public id: any;
    public identity: any;

  constructor(
      private usuarioServicio: UsuarioService,
  ) { }

  ngOnInit(): void {
      this.id = this.usuarioServicio.getIdFromLocalStorage();
      this.encontrarUsuario(this.id);
  }

    async encontrarUsuario(id) {
        const data = {
            id: id,
        };
        this.usuarioServicio.encontrar_perfil(data).then((query: any) => {
            if (query.ok){
                this.identity = query.data;
            } else{
                alert('ocurrio un error');
            }
        });
    }

}
