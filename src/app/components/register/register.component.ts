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

@Component({
  selector: 'kickathon-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  public errors: any;
  public success: boolean = false;
  private requestService: RequestService = inject(RequestService);

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
      try {
        await this.requestService.register(this.registerForm.getRawValue());
        this.registerForm.reset();
        this.errors = null;
        this.success = true;
        this.router.navigate(['']);
      } catch (err) {
        this.errors = err;
        this.success = false;
      }
    }
  }
}
