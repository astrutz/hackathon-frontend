import {Component, inject, Input} from '@angular/core';
import {Game} from "../../../data/game.data";
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'kickathon-fixture',
  standalone: true,
  imports: [],
  templateUrl: './fixture.component.html',
  styleUrl: './fixture.component.scss'
})
export class FixtureComponent {
  dataService = inject(DataService);

  @Input({required: true})
  game!: Game;

  get player1(): string {
    if (this.is1v1) {
      return this.dataService.getPlayerById(this.game.team1Players?.[0])?.name ?? '';
    }
    return `${this.dataService.getPlayerById(this.game.team1Players?.[0])?.name ?? ''} & ${this.dataService.getPlayerById(this.game.team1Players?.[1])?.name ?? ''}`;
  }

  get player2(): string {
    if (this.is1v1) {
      return this.dataService.getPlayerById(this.game.team2Players?.[0])?.name ?? '';
    }
    return `${this.dataService.getPlayerById(this.game.team2Players?.[0])?.name ?? ''} & ${this.dataService.getPlayerById(this.game.team2Players?.[1])?.name ?? ''}`;
  }

  get is1v1(): boolean {
    return (this.game.team1Players.length ?? 1) === 1;
  }
}
