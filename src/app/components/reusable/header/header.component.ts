import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { RequestService } from '../../../services/request.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'kickathon-header',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  requestService: RequestService = inject(RequestService);
  userService: UserService = inject(UserService);

  @Input()
  name: string = '';

  @Input()
  imagSrc: string = 'img/demoavatar.jpg'; // TODO: besser fallback umsetzen https://mdmoin07.medium.com/image-fallback-for-broken-images-angular-aa3d5538ea0

  constructor() {
    this.requestService.getPlayer(this.userService.getCurrentPlayerId()).then((player) => {
      this.name = player.name;
      this.imagSrc = player.imageUrl??"img/demoavatar.jpg";
      console.log(player);
    });
  }

  onLogout():void {
    this.userService.logout();
  }
}
