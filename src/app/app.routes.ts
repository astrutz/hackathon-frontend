import { Routes } from '@angular/router';
import { LeaderboardComponent } from './components/pages/leaderboard/leaderboard.component';
import { GamesComponent } from './components/pages/games/games.component';

export const routes: Routes = [
  { path: '', redirectTo: '/leaderboard', pathMatch: 'full' },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'games', component: GamesComponent },
];
