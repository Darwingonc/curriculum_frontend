import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

    public id: any;
    public identity: any;

  constructor(
      private usuarioServicio: UsuarioService,
  ) { }

  ngOnInit(): void {
      this.encontrarUsuario();
  }

    encontrarUsuario(): void {
        this.usuarioServicio.encontrar_perfil().subscribe({
            next: (query: any) => {
                if (query.ok) {
                    this.identity = query.data;
                } else {
                    alert('Ocurrió un error al obtener el perfil');
                }
            },
            error: (err) => {
                console.error('Error al obtener perfil', err);
                //alert('Error en el servidor');
            }
        });
    }


}
