import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Player } from '../data/player.data';
import { Game } from '../data/game.data';
import { RequestService } from './request.service';
import { PlayerHistory } from '../data/history.data';

export type APIData<T> = {
  data: T;
  loadingState: 'loading' | 'success';
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public players$: WritableSignal<APIData<Player[]>> = signal({
    data: [],
    loadingState: 'loading',
  });
  public games$: WritableSignal<APIData<Game[]>> = signal({
    data: [],
    loadingState: 'loading',
  });
  public history$: WritableSignal<PlayerHistory[]> = signal([]);

  public sortType$ = signal('');
  public calendarWeek$ = signal(this.weekNumber);
  public calendarYear$ = signal(this.currentYear);

  private _requestService: RequestService = inject(RequestService);
  constructor() {
    effect(() => {
      this._requestService
        .getPlayers(this.sortType$() === '' ? undefined : this.sortType$())
        .then((players) => {
          this.players$.set({ data: players, loadingState: 'success' });
          this.loadPlayerHistory();
        });
    });
    effect(() => {
      this._requestService.getGames(this.calendarWeek$(), this.calendarYear$()).then((games) => {
        this.games$.set({ data: games, loadingState: 'success' });
      });
    });
  }

  public getPlayerById(id: number): Player | null {
    return this.players$().data.find((player) => player.id === id) ?? null;
  }

  public loadPlayerHistory() {
    this.history$.set([]);
    this.players$().data.forEach((player) => {
      this._requestService.getHistory(player.id).then((history) => {
        this.history$.update((oldHistory) => {
          return [...oldHistory, { name: player.name, history }];
        });
      });
    });
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
