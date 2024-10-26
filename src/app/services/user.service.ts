import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private router: Router = inject(Router);
  private jwtHelper: JwtHelperService = inject(JwtHelperService);

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
    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  setCurrentPlayerId(id: number) {
    localStorage.setItem('playerId', String(id));
  }

  public getCurrentPlayerId(): any {
    return localStorage.getItem('playerId');
  }
}
