import { Component } from '@angular/core';
import { MensajeService, Mensaje } from '../../components/services/mensaje.service';

@Component({
    selector: 'app-alerta',
    templateUrl: './alerta.component.html',
    styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent {
    mensajes: Mensaje[] = [];

    constructor(private mensajeService: MensajeService) {
        this.mensajeService.mensajes$.subscribe(m => {
            this.mensajes = m;
        });
    }

    cerrar(mensaje: Mensaje) {
        this.mensajeService.cerrar(mensaje);
    }
}

