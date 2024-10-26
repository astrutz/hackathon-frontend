import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'kickathon-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  public errors: any;
  public success: boolean = false;
  private requestService: RequestService = inject(RequestService);

  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);

  registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
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

  onRegister(): void {
    this.requestService.register(this.registerForm.getRawValue())
      .then(() => {
        this.registerForm.reset();
        this.errors = null;
        this.success = true;
        this.router.navigate(['login'])
      })
      .catch((errors) => {
        this.errors = errors;
        this.success = false;
      })
  }

}
