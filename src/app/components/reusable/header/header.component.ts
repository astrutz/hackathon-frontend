import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'kickathon-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userService: UserService = inject(UserService);

  @Input()
  userName: String = 'Teamname';
}
