import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { RequestService } from '../../services/request.service';
import { NgClass } from '@angular/common';
import { ToastComponent } from '../reusable/toast/toast.component';

@Component({
  selector: 'kickathon-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ToastComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent implements OnInit, AfterViewInit {
  public errors: any;
  private requestService: RequestService = inject(RequestService);
  private _userService: UserService = inject(UserService);
  private _router: Router = inject(Router);

  constructor(private renderer: Renderer2) {}

  protected loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  formState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  get name(): AbstractControl {
    return this.loginForm.get('name')!;
  }

  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  get isNameInvalid(): boolean {
    return (this.name.invalid && (this.name.dirty || this.name.touched)) ?? false;
  }

  get isPasswordInvalid(): boolean {
    return (this.password.invalid && (this.password.dirty || this.password.touched)) ?? false;
  }

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    script.type = 'module';
    script.onload = () => {
      console.log('model-viewer script loaded');
    };
    this.renderer.appendChild(document.head, script);
  }

  @ViewChild('modelViewer') modelViewerRef!: ElementRef;

  ngAfterViewInit(): void {
    // Sicherstellen, dass die modelViewerRef-Referenz initialisiert wurde
    if (!this.modelViewerRef) {
      console.error('ModelViewer reference is not available');
    }
  }

  // Berechnung für die Rotation beim Hovern
  onHover(event: MouseEvent): void {
    if (!this.modelViewerRef) return; // Sicherheitsüberprüfung

    const screenWidth = window.innerWidth;
    const mouseX = event.clientX;
    const rotationY = (mouseX / screenWidth) * 360;

    // Fester Abstand zur Kamera, z. B. 3m
    this.modelViewerRef.nativeElement.cameraOrbit = `${rotationY}deg 90deg 90deg 3m`;
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.valid) {
      this.formState = 'loading';
      try {
        const result = await this.requestService.login(this.loginForm.getRawValue());
        this._userService.setToken(result.jwt);
        this._userService.setCurrentPlayerId(result.id);
        this.formState = 'success';
        const queryParam = this._router.parseUrl(this._router.url)?.queryParams?.['url'];
        this._router.navigate([queryParam ?? 'results']);
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
