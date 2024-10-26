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

  chartColors: string[] | null = null;
  formCurveChart!: Chart;

  constructor() {
    effect(() => {
      const existing_chart = Chart.getChart('curve');
      existing_chart?.destroy();
      this.createChart();
    });
  }

  createChart(): void {
    this.generateChartColors();
    const datasets = this.dataService.history$().map((result, i) => ({
      label: result.name ?? '',
      data: result.history.map((r) => (this.dataService.sortType$() === 'elo' ? r.elo : r.billo)),
      borderColor: this.chartColors![i],
      fill: false,
      tension: 0,
    }));

    this.formCurveChart = new Chart('curve', {
      type: 'line',
      data: {
        labels: this.dataService.history$()?.[0]?.history.map((result) => `${result.year}/${result.week}`), // todo: longest history
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
            min: this.getSmallestCount(this.dataService.sortType$() === 'elo'),
            max: this.getHighestCount(this.dataService.sortType$() === 'elo'),
            title: {
              display: true,
              text: 'Elo',
            },
          },
        },
      },
    });
  }

  getSmallestCount(isElo: boolean) {
    const lowest = Math.min(
      ...this.dataService.history$().map((result) =>
        isElo ? Math.min(...result.history.map((r) => r.elo)) : Math.min(...result.history.map((r) => r.billo)),
      ),
    );
    return Math.floor(lowest * 0.95);
  }

  getHighestCount(isElo: boolean) {
    const highest = Math.max(
      ...this.dataService.history$().map((result) =>
        isElo ? Math.max(...result.history.map((r) => r.elo)) : Math.max(...result.history.map((r) => r.billo)),
      ),
    );
    return Math.ceil(highest * 1.05);
  }


  generateChartColors(): void{
    if(!this.chartColors) {
      this.chartColors = this.dataService.history$().map((_, i) =>
        `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
      );
    }
  }
}
