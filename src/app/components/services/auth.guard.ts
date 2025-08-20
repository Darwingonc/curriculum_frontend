import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private usuarioServicio: UsuarioService,
        private router: Router,
        private http: HttpClient
    ) {}

    canActivate(): boolean {
        const token = this.usuarioServicio.getTokenFromLocalStorage();
        if (!token) {
            console.log('No token found, redirecting to login');
            return false;
        }
        return true;
    }
}
