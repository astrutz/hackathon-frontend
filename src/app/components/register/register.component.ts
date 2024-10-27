import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RequestService } from '../../services/request.service';
import {ToastComponent} from "../reusable/toast/toast.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'kickathon-register',
  standalone: true,
  imports: [ReactiveFormsModule, ToastComponent, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public errors: any;
  formState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  private requestService: RequestService = inject(RequestService);
  private _userService: UserService = inject(UserService);

  private router: Router = inject(Router);

  protected registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  async onRegister(): Promise<void> {
    if (this.registerForm.valid) {
      this.formState = 'loading';
      try {
        const result = await this.requestService.register(this.registerForm.getRawValue());
        this._userService.setToken(result.jwt);
        this._userService.setCurrentPlayerId(result.id);
        this.formState = 'success';
        this.router.navigate(['leaderboard']);
      } catch (err: any) {
        this.formState = 'error';
        if (err.response.data.message) {
          this.errors = err.response.data.message;
        } else {
          this.errors = err.toString();
        }
      }
    }
  }
}
