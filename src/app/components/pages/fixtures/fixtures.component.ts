import { Component, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { FixtureComponent } from '../../reusable/fixture/fixture.component';

@Component({
  selector: 'kickathon-fixtures',
  standalone: true,
  imports: [FixtureComponent],
  templateUrl: './fixtures.component.html',
  styleUrl: './fixtures.component.scss',
})
export class FixturesComponent {
  dataService = inject(DataService);

  get weekNumber(): number {
    let now = new Date();
    let onejan = new Date(now.getFullYear(), 0, 1);
    let week = Math.ceil(((now.getTime() - onejan.getTime()) / 86400000 + onejan.getDay() + 1) / 7);
    return week - 1;
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
