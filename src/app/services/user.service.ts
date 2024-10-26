import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
  ) {}

  public login(data: any): Observable < any > {
    return this.http.post < any > (`${environment.endpoint}/v1/auth/login`, data)
      .pipe(
        map((auth: any) => {
          if (auth && auth.token) {
            this.setToken(auth.token);
          }
        })
      );
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

  public register(data: any): Observable < any > {
    return this.http.post < any > (`${environment.endpoint}/v1/auth/register`, data);
  }

  public isAuthenticated(): boolean {
    //console.log(this.getToken());

    return !this.jwtHelper.isTokenExpired(
      this.getToken()
    );
  }

}
