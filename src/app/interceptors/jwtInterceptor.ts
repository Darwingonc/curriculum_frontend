import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import { Router } from '@angular/router';
import { UsuarioService } from '../components/services/usuario-service';
import { MensajeService } from '../components/services/mensaje.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private usuarioService: UsuarioService,
        private mensajeService: MensajeService,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.usuarioService.getTokenFromLocalStorage();
        const authReq = token ? req.clone({ setHeaders: { Authorization: token } }) : req;

        return next.handle(authReq).pipe(
            tap((event: HttpEvent<any>) => {
                // Para respuestas exitosas (200, 201, etc.)
                if (event instanceof HttpResponse) {
                    const mensaje = event.body?.message;
                    if (mensaje) {
                        this.mensajeService.mostrar(mensaje, 'success');
                    }
                }
            }),
            catchError((err: HttpErrorResponse) => {
                // Para errores HTTP
                const mensaje = err.error?.errors?.[0]?.message || 'Error de conexión';

                // Errores 401 y 403 se elimina token y redirige a iniciar sesión
                if ([401, 403].includes(err.status)) {
                    console.log('Error en la petición:', mensaje, 'estado:' + err.status);
                    this.mensajeService.mostrar(mensaje, 'error'); // 🔴 borde rojo
                    this.usuarioService.clearToken();
                    this.router.navigate(['iniciar-sesion']);
                } else {
                    console.log('Error en la petición:', mensaje, 'estado:' + err.status);
                    this.mensajeService.mostrar(mensaje, 'warning'); // 🟠 borde naranja
                }

                return throwError(() => err);
            })
        );
    }
}

