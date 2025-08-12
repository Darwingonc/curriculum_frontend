import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.scss']
})
export class HabilidadesComponent implements OnInit {

    public id: any;
    public habilidades: any;

  constructor(
      private usuarioServicio: UsuarioService,
  ) { }

  ngOnInit(): void {
      this.id = this.usuarioServicio.getIdFromLocalStorage();
      this.encontrarHabilidades(this.id);
  }

    async encontrarHabilidades(id) {
        const data = {
            id_perfil: id,
        };
        this.usuarioServicio.encontrar_habilidad(data).then((query: any) => {
            if (query.ok){
                this.habilidades = query.data;
            } else{
                alert('ocurrio un error');
            }
        });
    }

}
