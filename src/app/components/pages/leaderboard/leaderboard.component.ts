import { Component, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'kickathon-leaderboard',
  standalone: true,
  imports: [],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent {
  protected dataService: DataService = inject(DataService);
}
