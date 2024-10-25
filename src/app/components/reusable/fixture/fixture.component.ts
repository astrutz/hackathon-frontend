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
      return this.dataService.getPlayerById(this.game.players[0])?.name ?? '';
    }
    return `${this.dataService.getPlayerById(this.game.players[0])?.name ?? ''} & ${this.dataService.getPlayerById(this.game.players[1])?.name ?? ''}`;
  }

  get player2(): string {
    if (this.is1v1) {
      return this.dataService.getPlayerById(this.game.players[1])?.name ?? '';
    }
    return `${this.dataService.getPlayerById(this.game.players[2])?.name ?? ''} & ${this.dataService.getPlayerById(this.game.players[3])?.name ?? ''}`;
  }

  get is1v1(): boolean {
    return this.game.players.length === 2;
  }
}
