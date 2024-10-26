import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Player } from '../data/player.data';
import { Game } from '../data/game.data';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public players$: WritableSignal<Player[]> = signal([]);
  public games$: WritableSignal<Game[]> = signal([]);

  public sortType$ = signal('');
  public calendarWeek$ = signal(this.weekNumber);
  public calendarYear$ = signal(this.currentYear);

  private _requestService: RequestService = inject(RequestService);
  constructor() {
    effect(() => {
      this._requestService
        .getPlayers(this.sortType$() === '' ? undefined : this.sortType$())
        .then((players) => {
          this.players$.set(players);
        });
    });
    effect(() => {
      this._requestService.getGames(this.calendarWeek$(), this.calendarYear$()).then((games) => {
        this.games$.set(games);
      });
    });
  }

  public getPlayerById(id: number): Player | null {
    return this.players$().find((player) => player.id === id) ?? null;
  }

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
