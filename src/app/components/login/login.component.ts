import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';

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

  protected loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  get name() {
    return this.loginForm.get('name');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.valid) {
      try {
        const result = await this.requestService.login(this.loginForm.getRawValue());
        this._userService.setToken(result.jwt);
        this._userService.setCurrentPlayerId(result.id);
        this.router.navigate(['']);
      } catch (err) {
        this.errors = err;
      }
    }
  }
}
