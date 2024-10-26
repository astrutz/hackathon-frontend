import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Player } from '../data/player.data';
import { Game } from '../data/game.data';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public players$: WritableSignal<Player[]> = signal([]);
  public games$: WritableSignal<Game[]> = signal([]);

  private _requestService: RequestService = inject(RequestService);
  constructor() {
    this._requestService.getPlayers().then((players) => {
      this.players$.set(players);
    });
    this._requestService.getGames().then((games) => {
      this.games$.set(games);
    });
  }

  public getPlayerById(id: string): Player | null {
    return this.players$().find((player) => player.id === id) ?? null;
  }
}
