import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kickathon-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public errors: any;
  private _userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin(): void {
    this._userService
      .login(this.loginForm.value)
      .then((token) => {
        this._userService.setToken(token);
        this.router.navigate(['leaderboard']);
      })
      .catch((errors) => {
        this.errors = errors;
      });
  }
}
