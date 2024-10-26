import { Component, effect, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'kickathon-curve',
  standalone: true,
  imports: [],
  templateUrl: './curve.component.html',
  styleUrl: './curve.component.scss',
})
export class CurveComponent {
  protected dataService: DataService = inject(DataService);

  formCurveChart!: Chart;

  // Beispielhafte Daten für 10 Spiele
  results = [
    [
      { year: 2024, week: 42, elo: 1000, billo: 20 },
      { year: 2024, week: 43, elo: 1005, billo: 22 },
      { year: 2024, week: 44, elo: 980, billo: 19 },
      { year: 2024, week: 45, elo: 1200, billo: 20 },
      { year: 2024, week: 46, elo: 1103, billo: 24 },
    ],
    [
      { year: 2024, week: 42, elo: 1000, billo: 20 },
      { year: 2024, week: 43, elo: 1005, billo: 22 },
      { year: 2024, week: 44, elo: 980, billo: 19 },
      { year: 2024, week: 45, elo: 1200, billo: 20 },
      { year: 2024, week: 46, elo: 1103, billo: 24 },
    ],
    [
      { year: 2024, week: 42, elo: 1000, billo: 20 },
      { year: 2024, week: 43, elo: 1005, billo: 22 },
      { year: 2024, week: 44, elo: 980, billo: 19 },
      { year: 2024, week: 45, elo: 1200, billo: 20 },
      { year: 2024, week: 46, elo: 1103, billo: 24 },
    ],
  ]; // 1: Sieg, 0: Unentschieden, -1: Niederlage

  constructor() {
    effect(() => {
      const existing_chart = Chart.getChart('curve');
      existing_chart?.destroy();
      this.createChart();
    });
  }

  createChart(): void {
    const datasets = this.results.map((result, i) => ({
      label: 'Form Curve',
      data: result.map((r) => (this.dataService.sortType$() === 'elo' ? r.elo : r.billo)),
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: false,
      tension: 0,
    }));

    this.formCurveChart = new Chart('curve', {
      type: 'line',
      data: {
        labels: this.results[0].map((result) => `${result.year}/${result.week}`),
        datasets,
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Spieltag',
            },
          },
          y: {
            min: this.dataService.sortType$() === 'elo' ? 900 : 15,
            max: this.dataService.sortType$() === 'elo' ? 1300 : 30,
            title: {
              display: true,
              text: 'Elo',
            },
          },
        },
      },
    });
  }
}
