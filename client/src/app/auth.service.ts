import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface User {
  login: string,
  email: string,
  name: string
};

export type Jwt = string | undefined;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
    ) { };

  token: Jwt = undefined;
  user: User | undefined = undefined;
  
  
  registerUser(user: object) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(
      'account/registration',
      user,
      {headers: headers}
    );
  }

  changePassword(user: object) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(
      'account/change-password',
      user,
      {headers: headers}
    );
  }
  
  authUser(user: object) {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(
      'account/authorization',
      user,
      {headers: headers}
    );
  }

  storeUser(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  logout() {
    this.token = undefined;
    localStorage.setItem('token', '');
    this.user = undefined;
    localStorage.setItem('user', '');
  }

  isLoggedIn() {
    return !this.jwtHelper.isTokenExpired(this.token) || localStorage.getItem('token')
  }
  
}
