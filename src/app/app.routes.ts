import { Routes } from '@angular/router';
import { LeaderboardComponent } from './components/pages/leaderboard/leaderboard.component';
import { ResultsComponent } from './components/pages/results/results.component';
import { FixturesComponent } from './components/pages/fixtures/fixtures.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/leaderboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [LoginGuard] },
  { path: 'fixtures', component: FixturesComponent, canActivate: [LoginGuard] },
  { path: 'results', component: ResultsComponent, canActivate: [LoginGuard] },
];
