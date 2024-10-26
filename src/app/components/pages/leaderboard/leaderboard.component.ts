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
        if (game.players[0] === player.id || game.players[2] === player.id) {
          return game.score1;
        } else if (game.players[1] === player.id || game.players[3] === player.id) {
          return game.score2;
        }
        return 0;
      }) ?? []
    ).reduce((a, b) => a + b, 0);
  }

  private _getConcededGoals(player: Player): number {
    return (
      player.games?.map((game: Game) => {
        if (game.players[0] === player.id || game.players[2] === player.id) {
          return game.score2;
        } else if (game.players[1] === player.id || game.players[3] === player.id) {
          return game.score1;
        }
        return 0;
      }) ?? []
    ).reduce((a, b) => a + b, 0);
  }

  protected readonly players = players;
}
