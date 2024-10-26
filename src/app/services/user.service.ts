import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private host= '/api';

  private router: Router = inject(Router);
  private jwtHelper: JwtHelperService = inject(JwtHelperService);

  public async login(data: any): Promise<any> {
    return (await axios.post(`${this.host}/auth/login`, data)).data;
  }

  public async register(data: any): Promise<any> {
    return (await axios.post(`${this.host}/auth/register`, data)).data
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getToken(): any {
    return localStorage.getItem('token');
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(
      this.getToken(),
    );
  }

}
