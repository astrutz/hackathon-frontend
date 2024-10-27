import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { UserService } from '../../services/user.service';
import { NgClass, NgOptimizedImage } from '@angular/common';
import {ToastComponent} from "../reusable/toast/toast.component";

@Component({
  selector: 'kickathon-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule, NgOptimizedImage, NgClass, ToastComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
  formState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  errors: any = null;

  requestService: RequestService = inject(RequestService);
  userService: UserService = inject(UserService);

  protected userProfileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.userProfileForm.get('name');
  }

  async onUpdateProfile() {
    if (this.userProfileForm.valid && this.userService.currentPlayerId) {
      this.formState = 'loading';
      try {
        await this.requestService.patchName(
          this.userProfileForm.getRawValue(),
          this.userService.currentPlayerId,
        );
        await this.userService.setPlayer();
        this.formState = 'success';
      } catch (err) {
        this.formState = 'error';
        this.errors = err;
      }
    }
  }

  async uploadPicture(event: Event) {
    console.log('HELLLLOOOOOO', event);
    const file = (event.target as HTMLInputElement)?.files?.item(0);
    if (file) {
      const formData: FormData = new FormData();

      formData.append('image', file, file.name);
      this.userService.currentUser!.imageUrl = await this.requestService.uploadPicture(
        formData,
        this.userService.currentPlayerId!,
      );
    }
  }
}
