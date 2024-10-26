import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { UserService } from '../../services/user.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'kickathon-user-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {

  errors: any = null;

  requestService: RequestService = inject(RequestService);
  userService: UserService = inject(UserService);

  @Input()
  playerName: string = '';

  @Input()
  imagSrc: string = 'img/demoavatar.jpg'; // TODO: besser fallback umsetzen https://mdmoin07.medium.com/image-fallback-for-broken-images-angular-aa3d5538ea0

  protected userProfileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.userProfileForm.get('name');
  }

  constructor() {
    this.requestService.getPlayer(this.userService.getCurrentPlayerId()).then((player) => {
      this.playerName = player.name;
      this.imagSrc = player.imageUrl??"img/demoavatar.jpg";
      console.log(player);
    });
  }

  async onUpdateProfile() {
    if (this.userProfileForm.valid) {
      try {
        await this.requestService.patchName(this.userProfileForm.getRawValue(), this.userService.getCurrentPlayerId());
      } catch (err) {
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
      this.imagSrc = await this.requestService.uploadPicture(formData, this.userService.getCurrentPlayerId());
      console.log(this.imagSrc);
    }
  }

}
