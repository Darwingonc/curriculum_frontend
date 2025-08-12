import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    public id: any;
    public token: any;

    public url: string;

  constructor( public httpClient: HttpClient) {
      this.url = environment.apiUrl;
  }

  async iniciarSesion(data: any) {
      const query = this.httpClient.post(this.url + '/login', data).toPromise() ;
      return query;
  }

    async registro(data: any) {
        const query = this.httpClient.post(this.url + '/registro', data).toPromise() ;
        return query;
    }



  async encontrar_perfil(data: any) {
      const query = this.httpClient.post(this.url + '/encontrar_perfil', data).toPromise();
      return query;
  }

    async encontrar_experiencias(data: any) {
        const query = this.httpClient.post(this.url + '/encontrar_experiencias', data).toPromise();
        return query;
    }

    async encontrar_educaciones(data: any) {
        const query = this.httpClient.post(this.url + '/encontrar_educaciones', data).toPromise();
        return query;
    }

    async encontrar_habilidad(data: any) {
        const query = this.httpClient.post(this.url + '/encontrar_habilidades', data).toPromise();
        return query;
    }


    public crear_habilidad(token: any, data: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.post(this.url + '/crear_habilidades', data, {headers});
    }

    public crear_experienia(token: any, data: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.post(this.url + '/crear_experiencia', data, {headers});
    }

    public crear_educacion(token: any, data: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.post(this.url + '/crear_educacion', data, {headers});
    }



    public actualizar_perfil(token: any, data: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.patch(this.url + '/actualizar_perfil', data, {headers});
    }

    public actualizar_habilidad(token: any, data: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.patch(this.url + '/actualizar_habilidades', data, {headers});
    }

    public actualizar_experiencia(token: any, data: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.patch(this.url + '/actualizar_experiencias', data, {headers});
    }

    public actualizar_educacion(token: any, data: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.patch(this.url + '/actualizar_educaciones', data, {headers});
    }

    public eliminar_habilidad(token: any, data: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.post(this.url + '/eliminar_habilidades', data, {headers});
    }

    public eliminar_experiencia(token: any, data: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.post(this.url + '/eliminar_experiencias', data, {headers});
    }

    public eliminar_educacion(token: any, data: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', token);
        return this.httpClient.post(this.url + '/eliminar_educaciones', data, {headers});
    }



    public login(user: any): Observable<any> {
        return this.httpClient.post(this.url + '/login', user);
    }


    public getIdFromLocalStorage(): any {
        const id: any = localStorage.getItem('id');

        if (id != null) {
            this.id = JSON.parse(id);
        } else {
            this.id = null;
        }

        return this.id;
    }

    public getTokenFromLocalStorage(): any {
        const token = localStorage.getItem('token');

        if (token != null) {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

  checkAuth (){
      return false;
  }
}
