import { Component, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { NgClass } from '@angular/common';
import { Player } from '../../../data/player.data';
import { Game } from '../../../data/game.data';
import { players } from '../../../example/players.example';

@Component({
  selector: 'kickathon-leaderboard',
  standalone: true,
  imports: [NgClass],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent {
  protected dataService: DataService = inject(DataService);

  getGoals(player: Player): string {
    return `${this._getScoredGoals(player)} : ${this._getConcededGoals(player)}`;
  }

  getGoalDifference(player: Player): number {
    return this._getScoredGoals(player) - this._getConcededGoals(player);
  }

  private _getScoredGoals(player: Player): number {
    return (
      player.games?.map((game: Game) => {
        if (game.team1Players[0] === player.id || game.team1Players[1] === player.id) {
          return game.scoreTeam1;
        } else if (game.team2Players[0] === player.id || game.team2Players[1] === player.id) {
          return game.scoreTeam2;
        }
        return 0;
      }) ?? []
    ).reduce((a, b) => a + b, 0) ?? 0;
  }

  private _getConcededGoals(player: Player): number {
    return (
      player.games?.map((game: Game) => {
        if (game.team1Players[0] === player.id || game.team1Players[1] === player.id) {
          return game.scoreTeam2;
        } else if (game.team2Players[0] === player.id || game.team2Players[1] === player.id) {
          return game.scoreTeam1;
        }
        return 0;
      }) ?? []
    ).reduce((a, b) => a + b, 0) ?? 0;
  }

  onChange(event: Event, value: string): void {
    this.dataService.sortType$.set(value);
  }
}
