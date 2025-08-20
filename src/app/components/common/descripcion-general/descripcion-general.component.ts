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
    public token: any;

  constructor(
      private usuarioServicio: UsuarioService,
  ) { }

  ngOnInit(): void {
      this.id = this.usuarioServicio.getIdFromLocalStorage();
      this.token = this.usuarioServicio.getTokenFromLocalStorage();
      this.encontrarUsuario();
  }

    encontrarUsuario(): void {
        this.usuarioServicio.encontrar_perfil().subscribe({
            next: (query: any) => {
                if (query.ok) {
                    this.identity = query.data;
                } else {
                    alert('Ocurrió un error al obtener perfil');
                }
            },
            error: (err) => {
                console.error('Error al obtener perfil', err);
                //alert('Error en el servidor');
            }
        });
    }

}
