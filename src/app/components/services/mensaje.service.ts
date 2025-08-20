// mensaje.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Mensaje {
    texto: string;
    tipo: 'success' | 'warning' | 'error' |  'info';
}

@Injectable({
    providedIn: 'root'
})
export class MensajeService {
    private _mensajes = new BehaviorSubject<Mensaje[]>([]);
    mensajes$ = this._mensajes.asObservable();

    // Agregar un mensaje
    mostrar(texto: string, tipo: 'success' | 'warning' | 'error'| 'info' = 'success') {
        const mensajes = [...this._mensajes.value, { texto, tipo }];
        this._mensajes.next(mensajes);
    }

    // **Este es el método que faltaba**
    cerrar(mensaje: Mensaje) {
        const mensajes = this._mensajes.value.filter(m => m !== mensaje);
        this._mensajes.next(mensajes);
    }
}
