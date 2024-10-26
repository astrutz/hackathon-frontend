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

  decreaseCalendarWeek() {
    if (this.dataService.calendarWeek$() > 1) {
      this.dataService.calendarWeek$.set(this.dataService.calendarWeek$() - 1);
    } else {
      this.dataService.calendarWeek$.set(52);
      this.dataService.calendarYear$.set(this.dataService.calendarYear$() - 1);
    }
  }

  increaseCalendarWeek() {
    if (this.dataService.calendarWeek$() < 52) {
      this.dataService.calendarWeek$.set(this.dataService.calendarWeek$() + 1);
    } else {
      this.dataService.calendarWeek$.set(1);
      this.dataService.calendarYear$.set(this.dataService.calendarYear$() + 1);
    }
  }
}
