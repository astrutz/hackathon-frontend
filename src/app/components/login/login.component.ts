import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'kickathon-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public errors: any;
  private requestService: RequestService = inject(RequestService);
  private _userService: UserService = inject(UserService);
  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  get name() {
    return this.loginForm.get('name');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onLogin(): void {
    this.requestService
      .login(this.loginForm.getRawValue())
      .then((token) => {
        this._userService.setToken(token);
        this.router.navigate(['leaderboard']);
      })
      .catch((errors) => {
        this.errors = errors;
      });
  }
}
