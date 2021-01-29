import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginUserModel } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyC-9xiOytxlL6s-fnlqL8scqnxGn8xr3CQ';

  userToken: string;
  constructor(private http: HttpClient) {
    this.leerToken();
  }

  login(usuario: LoginUserModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true,
    };
    return this.http
      .post(`${this.url}signInWithPassword?key=${this.apikey}`, authData)
      .pipe(
        map((res) => {
          // tslint:disable-next-line: no-string-literal
          this.guardarToken(res['idToken']);
          return res;
        })
      );
  }
  salir() {
    localStorage.removeItem('Token');
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('Token', idToken);
    const hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken() {
    if (localStorage.getItem('Token')) {
      this.userToken = localStorage.getItem('Token');
    } else {
      this.userToken = '';
    }
  }

  estaAutenticado(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
