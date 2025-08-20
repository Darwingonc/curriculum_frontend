import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.scss']
})
export class HabilidadesComponent implements OnInit {

    public idUser: any;
    public habilidades: any;

  constructor(
      private usuarioServicio: UsuarioService,
  ) { }

  ngOnInit(): void {
      this.idUser = this.usuarioServicio.getIdFromLocalStorage();
      console.log('ID del usuario:', this.idUser);
      this.encontrarHabilidades(this.idUser);
  }

    async encontrarHabilidades(idUser: any): Promise<void>{
        const data = {
            id_perfil: this.idUser,
        };
        this.usuarioServicio.encontrar_habilidad(data).then((query: any) => {
            console.log(data);
            if (query.ok){
                this.habilidades = query.data;
                console.log('mensaje');
                console.log(this.habilidades);
            } else{
                alert('ocurrio un error');
            }
        });
    }

}
