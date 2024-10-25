import { Routes } from '@angular/router';
import { LeaderboardComponent } from './components/pages/leaderboard/leaderboard.component';
import { ResultsComponent } from './components/pages/results/results.component';

export const routes: Routes = [
  { path: '', redirectTo: '/leaderboard', pathMatch: 'full' },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'fixtures', component: ResultsComponent },
  { path: 'results', component: ResultsComponent },
];
