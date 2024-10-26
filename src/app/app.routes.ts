import { Routes } from '@angular/router';
import { LeaderboardComponent } from './components/pages/leaderboard/leaderboard.component';
import { ResultsComponent } from './components/pages/results/results.component';
import { FixturesComponent } from './components/pages/fixtures/fixtures.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/leaderboard', pathMatch: 'full' },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'fixtures', component: FixturesComponent },
  { path: 'results', component: ResultsComponent },
];
